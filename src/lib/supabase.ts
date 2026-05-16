import { createClient } from '@supabase/supabase-js';

// Vercel ke environment variables ko access karne ka sahi tarika
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
