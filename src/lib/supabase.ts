
import { createClient } from '@supabase/supabase-js';

declare global {
  interface Window {
    SUPABASE_URL?: string;
    SUPABASE_KEY?: string;
  }
}

const supabaseUrl = window.SUPABASE_URL;
const supabaseAnonKey = window.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials not found. Please connect your project to Supabase through Lovable\'s integration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
