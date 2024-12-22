import { describe, it, expect } from 'vitest';
import { signInWithGoogle, signOut, getCurrentUser } from '../api/auth/auth';
import { createClient } from '@supabase/supabase-js';

// モック化されたSupabaseクライアント
const mockSupabase = createClient('