import { createClient } from '@supabase/supabase-js';

// Utiliser des valeurs par défaut pour éviter les erreurs en développement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Vérifier si Supabase est configuré
export const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
};

// Avertir en mode développement
if (!isSupabaseConfigured()) {
  console.warn('⚠️ Supabase non configuré - mode développement activé');
}