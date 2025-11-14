import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

function buildUserPayload({ profile, authUser }) {
  if (!authUser) {
    return null;
  }

  const derivedName =
    profile?.display_name ||
    profile?.baby_nickname ||
    authUser.user_metadata?.full_name ||
    authUser.email?.split('@')[0] ||
    null;

  const camelProfile = profile
    ? {
        displayName: profile.display_name ?? null,
        babyNickname: profile.baby_nickname ?? null,
        partnerName: profile.partner_name ?? null,
        providerName: profile.provider_name ?? null,
        birthPlan: profile.birth_plan ?? null,
        bio: profile.bio ?? null,
        notes: profile.notes ?? null,
        communication: profile.communication ?? null,
        timezone: profile.timezone ?? null,
        reminders: profile.reminders ?? {},
        supportCircle: profile.support_circle ?? [],
        avatar: profile.avatar_url ?? null,
        dueDate: profile.due_date ?? null,
        lmpDate: profile.lmp_date ?? null,
        phone: profile.phone ?? null,
        location: profile.location ?? null,
      }
    : {};

  return {
    id: authUser.id,
    email: profile?.email ?? authUser.email,
    name: derivedName,
    ...profile,
    ...camelProfile,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({
    open: false,
    view: 'login',
    redirectTo: null,
  });

  const syncProfile = useCallback(
    async (authUser, retryCount = 0) => {
      if (!authUser) {
        setProfile(null);
        setUser(null);
        return null;
      }

      const MAX_RETRIES = 2;
      const TIMEOUT_MS = 5000; // Reduced from 8000ms to 5000ms

      // Add timeout for profile fetch with retry logic
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), TIMEOUT_MS)
      );

      let profileResult;
      try {
        profileResult = await Promise.race([profilePromise, timeoutPromise]);
      } catch (timeoutError) {
        if (timeoutError.message === 'Profile fetch timeout') {
          // Retry if we haven't exceeded max retries
          if (retryCount < MAX_RETRIES) {
            console.warn(`Profile fetch timed out, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
            // Wait a bit before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
            return syncProfile(authUser, retryCount + 1);
          }
          
          console.warn('Profile fetch timed out after retries, using default profile');
          // Create a default profile from auth user metadata
          const defaultProfile = {
            user_id: authUser.id,
            email: authUser.email,
            display_name:
              authUser.user_metadata?.full_name ||
              authUser.email?.split('@')[0] ||
              'Glow Mama',
            phone: authUser.user_metadata?.phone_number || null,
          };
          setProfile(defaultProfile);
          const payload = buildUserPayload({ profile: defaultProfile, authUser });
          setUser(payload);
          return payload;
        }
        throw timeoutError;
      }

      const { data, error } = profileResult;

      if (error && error.code !== 'PGRST116') {
        // Retry on non-404 errors
        if (retryCount < MAX_RETRIES && !error.message?.includes('JWT') && !error.message?.includes('expired')) {
          console.warn(`Profile fetch error, retrying (${retryCount + 1}/${MAX_RETRIES})...`, error);
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          return syncProfile(authUser, retryCount + 1);
        }
        throw error;
      }

      let profileData = data;

      if (!profileData) {
        const defaultProfile = {
          user_id: authUser.id,
          email: authUser.email,
          display_name:
            authUser.user_metadata?.full_name ||
            authUser.email?.split('@')[0] ||
            'Glow Mama',
          phone: authUser.user_metadata?.phone_number || null,
        };

        // Use upsert instead of insert to handle race conditions
        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .upsert(defaultProfile, { onConflict: 'user_id' })
          .select()
          .single();

        if (insertError) {
          // If insert fails, try to fetch again (might have been created by another request)
          if (retryCount < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return syncProfile(authUser, retryCount + 1);
          }
          throw insertError;
        }
        profileData = inserted;
      }

      setProfile(profileData);
      const payload = buildUserPayload({ profile: profileData, authUser });
      setUser(payload);
      return payload;
    },
    [],
  );

  useEffect(() => {
    let subscription;
    let mounted = true;

    const init = async () => {
      // Set a timeout to prevent hanging, but don't clear session on timeout
      // This allows for slow network connections (reduced from 20s to 10s)
      const timeoutId = setTimeout(() => {
        if (!mounted) return;
        // eslint-disable-next-line no-console
        console.warn('Session initialization taking longer than expected, but continuing...');
        // Don't clear session on timeout - just stop loading
        // The session might still be valid, just taking time to verify
        setLoading(false);
      }, 10000); // Reduced to 10 seconds for faster initial load

      try {
        // First, try to get the session from Supabase with timeout (reduced from 10s to 5s)
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session fetch timeout')), 5000)
        );

        let sessionResult;
        try {
          sessionResult = await Promise.race([sessionPromise, timeoutPromise]);
        } catch (timeoutError) {
          if (timeoutError.message === 'Session fetch timeout') {
            console.warn('Session fetch timed out, will rely on auth state listener');
            // Return null session - the auth state listener will handle restoration
            // This prevents the app from hanging while still allowing session recovery
            sessionResult = { data: { session: null }, error: null };
          } else {
            throw timeoutError;
          }
        }

        const {
          data: { session: initialSession },
          error: sessionError,
        } = sessionResult;

        if (!mounted) {
          clearTimeout(timeoutId);
          return;
        }

        clearTimeout(timeoutId);

        if (sessionError) {
          // eslint-disable-next-line no-console
          console.error('Session error', sessionError);
          // Only clear session on clear authentication errors (JWT expired, invalid token)
          // For network errors, keep existing state as session might still be valid
          if (
            sessionError.message?.includes('JWT') ||
            sessionError.message?.includes('expired') ||
            sessionError.message?.includes('invalid') ||
            sessionError.message?.includes('token')
          ) {
            setSession(null);
            setProfile(null);
            setUser(null);
          }
          // For other errors (network, etc.), don't clear - session might still be valid
    setLoading(false);
          return;
        }

        if (initialSession) {
          // Session found - set it and sync profile
          setSession(initialSession);
          if (initialSession.user) {
            try {
              await syncProfile(initialSession.user);
            } catch (profileError) {
              // eslint-disable-next-line no-console
              console.error('Error syncing profile', profileError);
              // Even if profile sync fails, keep the session
              // Profile can be synced later
            }
          } else {
            setProfile(null);
            setUser(null);
          }
        } else {
          // No session found - clear state
          setSession(null);
          setProfile(null);
          setUser(null);
        }
      } catch (error) {
        if (!mounted) {
          clearTimeout(timeoutId);
          return;
        }
        clearTimeout(timeoutId);
        // eslint-disable-next-line no-console
        console.error('Failed to initialize auth session', error);
        // Don't clear state on network errors - might be temporary
        // Supabase stores session in localStorage and will restore it automatically
        if (error.message?.includes('network') || error.message?.includes('fetch')) {
          // Network error - don't clear state, let Supabase's auth state listener handle restoration
          // eslint-disable-next-line no-console
          console.warn('Network error during session init, session may be restored by auth state listener');
          // Don't clear state - Supabase will restore from localStorage via auth state change
        } else {
          // Only clear on non-network errors (actual auth errors)
          setSession(null);
          setProfile(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, nextSession) => {
        if (!mounted) return;
        
        // eslint-disable-next-line no-console
        console.log('Auth state changed:', event, nextSession ? 'Session exists' : 'No session');
        
        // Handle different auth events
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Session is available or refreshed - update state
          setSession(nextSession);
          if (nextSession?.user) {
            try {
              await syncProfile(nextSession.user);
            } catch (profileError) {
              // eslint-disable-next-line no-console
              console.error('Error syncing profile on auth state change', profileError);
              // Keep session even if profile sync fails
            }
          } else {
            setProfile(null);
            setUser(null);
          }
        } else if (event === 'SIGNED_OUT') {
          // Explicit sign out - clear everything
          setSession(null);
          setProfile(null);
          setUser(null);
        } else {
          // For other events, update session if available
          setSession(nextSession);
          if (nextSession?.user) {
            try {
              await syncProfile(nextSession.user);
            } catch (profileError) {
              // eslint-disable-next-line no-console
              console.error('Error syncing profile', profileError);
            }
          } else if (event !== 'TOKEN_REFRESHED') {
            // Only clear if it's not a token refresh (token refresh might temporarily return null)
            // For other events with no session, clear state
            setProfile(null);
            setUser(null);
          }
        }
      },
    );

    subscription = authListener?.subscription;

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [syncProfile]);

  const login = useCallback(
    async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('No authentication response received.');
      }

      // Set session immediately for faster UI response
      if (data.session) {
        setSession(data.session);
      }

      // Sync profile in background (non-blocking)
      if (data.session?.user) {
        // Don't await - let it sync in background for faster login
        syncProfile(data.session.user).catch((profileError) => {
          console.warn('Profile sync in background failed, will retry:', profileError);
          // Retry after a short delay
          setTimeout(() => {
            syncProfile(data.session.user).catch(console.error);
          }, 2000);
        });
      }

      return data;
    },
    [syncProfile],
  );

  const signup = useCallback(
    async ({ email, password, name, phone }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone_number: phone || null,
          },
          emailRedirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}/`
              : undefined,
        },
      });

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('No authentication response received.');
      }

      // Set session immediately for faster UI response
      if (data.session) {
        setSession(data.session);
      }

      // Sync profile in background (non-blocking)
      if (data.session?.user) {
        // Don't await - let it sync in background for faster signup
        syncProfile(data.session.user).catch((profileError) => {
          console.warn('Profile sync in background failed, will retry:', profileError);
          // Retry after a short delay
          setTimeout(() => {
            syncProfile(data.session.user).catch(console.error);
          }, 2000);
        });
      }

      return data;
    },
    [syncProfile],
  );

  const logout = useCallback(async () => {
    // Reset all state immediately (do this first to prevent UI flicker)
    setSession(null);
    setProfile(null);
    setUser(null);
    
    try {
      // Sign out from Supabase (this will trigger onAuthStateChange)
      const { error } = await supabase.auth.signOut();
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Supabase signOut error', error);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout error', error);
    }
    
    // Clear all BlessedBump related data
    try {
    localStorage.removeItem('blessedbump_pregnancy_data');
      
      // Clear all Supabase-related localStorage keys
      const keysToRemove = [];
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          // Ignore errors for individual key removal
        }
      });
    } catch (e) {
      // If localStorage is blocked, try to clear it anyway
      try {
        localStorage.clear();
      } catch (clearError) {
        // eslint-disable-next-line no-console
        console.warn('Could not clear localStorage:', clearError);
      }
    }
    
    // Clear session storage as well
    try {
      sessionStorage.clear();
    } catch (e) {
      // Session storage might not be available in some contexts
    }
    
    // Wait a bit to ensure Supabase has processed the signOut
    await new Promise((resolve) => setTimeout(resolve, 100));
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) {
      return null;
    }
    return syncProfile(session.user);
  }, [session, syncProfile]);

  const updateUser = useCallback(
    async (updates, retryCount = 0) => {
      if (!session?.user) {
        throw new Error('No authenticated user to update.');
      }

      const MAX_RETRIES = 2;
      const TIMEOUT_MS = 5000;

      try {
        // Verify session is still valid before updating (with timeout)
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session check timeout')), 3000)
        );

        let currentSession;
        try {
          const sessionResult = await Promise.race([sessionPromise, timeoutPromise]);
          currentSession = sessionResult.data?.session;
        } catch (timeoutError) {
          if (timeoutError.message === 'Session check timeout') {
            // Use existing session if timeout
            currentSession = session;
          } else {
            throw timeoutError;
          }
        }

        if (!currentSession || !currentSession.user) {
          throw new Error('Session expired. Please log in again.');
        }

        const payload = {
          user_id: currentSession.user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        };

        // Optimistically update local state first
        const optimisticProfile = { ...profile, ...payload };
        setProfile(optimisticProfile);
        setUser(buildUserPayload({ profile: optimisticProfile, authUser: currentSession.user }));

        // Then sync to database with timeout and retry
        const updatePromise = supabase
          .from('profiles')
          .upsert(payload, { onConflict: 'user_id' })
          .select()
          .single();

        const updateTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Update timeout')), TIMEOUT_MS)
        );

        let result;
        try {
          result = await Promise.race([updatePromise, updateTimeout]);
        } catch (timeoutError) {
          if (timeoutError.message === 'Update timeout' && retryCount < MAX_RETRIES) {
            console.warn(`Update timed out, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
            return updateUser(updates, retryCount + 1);
          }
          throw timeoutError;
        }

        const { data, error } = result;

        if (error) {
          // Revert optimistic update on error
          if (profile) {
            setProfile(profile);
            setUser(buildUserPayload({ profile, authUser: currentSession.user }));
          }
          
          // Retry on non-auth errors
          if (retryCount < MAX_RETRIES && !error.message?.includes('JWT') && !error.message?.includes('expired')) {
            console.warn(`Update error, retrying (${retryCount + 1}/${MAX_RETRIES})...`, error);
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
            return updateUser(updates, retryCount + 1);
          }
          
          // Don't clear session on database errors - might be RLS or network issue
          throw error;
        }

        // Update state with confirmed data
        setProfile(data);
        setUser(buildUserPayload({ profile: data, authUser: currentSession.user }));

        return data;
      } catch (error) {
        // Revert optimistic update on error
        if (profile && retryCount >= MAX_RETRIES) {
          setProfile(profile);
          setUser(buildUserPayload({ profile, authUser: session.user }));
        }
        throw error;
      }
    },
    [session, profile],
  );

  const updateFertilityLog = useCallback(
    async (updates) => {
      if (!session?.user) {
        throw new Error('No authenticated user to update.');
      }

      const payload = {
        user_id: session.user.id,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('fertility_logs')
        .upsert(payload, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    [session],
  );

  const openAuthModal = useCallback((view = 'login', redirectTo = null) => {
    setAuthModal({ open: true, view, redirectTo });
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModal((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      session,
      loading,
      authModal,
      login,
      signup,
      logout,
      updateUser,
      updateFertilityLog,
      refreshProfile,
      openAuthModal,
      closeAuthModal,
      setAuthModal,
    }),
    [
      authModal,
      closeAuthModal,
      loading,
      login,
      logout,
      openAuthModal,
      profile,
      refreshProfile,
      session,
      signup,
      updateFertilityLog,
      updateUser,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

