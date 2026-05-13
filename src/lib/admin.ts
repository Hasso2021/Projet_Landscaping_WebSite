import { supabase } from '@/lib/supabase'

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_admin')

  if (error) {
    return false
  }

  return data === true
}
