import { createClient } from '@supabase/supabase-js';
import { assertPublicEnv } from './env';

export function getSupabaseServerClient() {
  assertPublicEnv();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}
