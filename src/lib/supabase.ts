import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// En mode développement, utiliser des valeurs par défaut pour éviter les erreurs
const isDevelopment = !import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Avertir en mode développement
if (isDevelopment) {
  console.warn('⚠️ Supabase non configuré - utilisation de valeurs par défaut. Cliquez sur "Connect to Supabase" pour configurer.');
}