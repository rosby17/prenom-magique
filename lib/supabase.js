// lib/supabase.js
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ── Helpers ──────────────────────────────────────────────────

/** Récupère le profil de l'utilisateur connecté */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

/** Vérifie si l'utilisateur peut encore générer (plan free) */
export async function canGenerate(userId) {
  const profile = await getProfile(userId)
  if (profile.plan === 'premium') return { allowed: true, profile }
  const FREE_LIMIT = parseInt(process.env.NEXT_PUBLIC_FREE_GENERATIONS || '5')
  return {
    allowed: profile.generations_used < FREE_LIMIT,
    remaining: FREE_LIMIT - profile.generations_used,
    profile
  }
}

/** Incrémente le compteur de générations */
export async function incrementGenerations(userId) {
  await supabase.rpc('increment_generations', { uid: userId })
}

/** Sauvegarde une génération dans l'historique */
export async function saveGeneration(userId, { sexe, filters, names }) {
  const { data, error } = await supabase
    .from('generations')
    .insert({ user_id: userId, sexe, filters, names })
    .select()
    .single()
  if (error) throw error
  return data
}

/** Toggle un favori */
export async function toggleFavorite(userId, { prenom, signification, origine, generation_id }) {
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('prenom', prenom)
    .single()

  if (existing) {
    await supabase.from('favorites').delete().eq('id', existing.id)
    return false
  } else {
    await supabase.from('favorites').insert({ user_id: userId, prenom, signification, origine, generation_id })
    return true
  }
}

/** Récupère les favoris de l'utilisateur */
export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}
