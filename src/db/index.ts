import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 環境に応じて適切な.envファイルを読み込む
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `src/config/env/.env.${environment}` });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
});

export default supabase;