import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide fallback empty strings to prevent client creation errors
// The app will show errors in the UI if these are missing
const safeUrl = supabaseUrl || '';
const safeKey = supabaseAnonKey || '';

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    '⚠️ Supabase environment variables are missing!\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.\n' +
    'For local development: Create a .env.local file\n' +
    'For Netlify: Set environment variables in Netlify dashboard'
  );
}

// Configure Supabase client with storage that works in private mode
export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Export a helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};


