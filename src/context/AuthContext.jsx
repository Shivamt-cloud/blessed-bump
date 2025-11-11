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
    async (authUser) => {
      if (!authUser) {
        setProfile(null);
        setUser(null);
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
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

        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .insert(defaultProfile)
          .select()
          .single();

        if (insertError) {
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

    const init = async () => {
      // Set a timeout to prevent hanging
      const timeoutId = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.warn('Session initialization timeout - proceeding without session');
        setSession(null);
        setProfile(null);
        setUser(null);
        setLoading(false);
      }, 5000); // 5 second timeout

      try {
        const {
          data: { session: initialSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        clearTimeout(timeoutId);

        if (sessionError) {
          // eslint-disable-next-line no-console
          console.error('Session error', sessionError);
          // Clear any stale session data
          setSession(null);
          setProfile(null);
          setUser(null);
          setLoading(false);
          return;
        }

        setSession(initialSession);
        if (initialSession?.user) {
          await syncProfile(initialSession.user);
        } else {
          setProfile(null);
          setUser(null);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        // eslint-disable-next-line no-console
        console.error('Failed to initialize auth session', error);
        // Ensure state is cleared on error
        setSession(null);
        setProfile(null);
        setUser(null);
      } finally {
        // Always set loading to false, even on error
        setLoading(false);
      }
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, nextSession) => {
        setSession(nextSession);
        if (nextSession?.user) {
          await syncProfile(nextSession.user);
        } else {
          setProfile(null);
          setUser(null);
        }
      },
    );

    subscription = authListener?.subscription;

    return () => {
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

      if (data.session?.user) {
        await syncProfile(data.session.user);
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

      if (data.session?.user) {
        await syncProfile(data.session.user);
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
        .from('profiles')
        .upsert(payload, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
      setUser(buildUserPayload({ profile: data, authUser: session.user }));

      return data;
    },
    [session],
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

