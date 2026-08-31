import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iimcidhaqldpujjbhdvi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_fSUe0gRNCSfVM0YdlOR1EA_2q3k6VUb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
