-- ================================================================
-- PRÉNOM MAGIQUE — Schéma Supabase
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- ================================================================

-- 1. Profils utilisateurs (lié à auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT,
  full_name     TEXT,
  avatar_url    TEXT,
  plan          TEXT NOT NULL DEFAULT 'free',   -- 'free' | 'premium'
  generations_used INT NOT NULL DEFAULT 0,
  stripe_customer_id  TEXT,
  stripe_subscription_id TEXT,
  subscribed_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Historique des générations
CREATE TABLE IF NOT EXISTS public.generations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sexe        TEXT NOT NULL,
  filters     JSONB DEFAULT '{}',
  names       JSONB NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Favoris sauvegardés
CREATE TABLE IF NOT EXISTS public.favorites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prenom      TEXT NOT NULL,
  signification TEXT,
  origine     TEXT,
  generation_id UUID REFERENCES public.generations(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, prenom)
);

-- ── Row Level Security ──────────────────────────────────────

ALTER TABLE public.profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites   ENABLE ROW LEVEL SECURITY;

-- Profiles : l'utilisateur voit uniquement son profil
CREATE POLICY "profiles_self" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Generations : l'utilisateur voit uniquement ses générations
CREATE POLICY "generations_self" ON public.generations
  FOR ALL USING (auth.uid() = user_id);

-- Favorites : l'utilisateur voit uniquement ses favoris
CREATE POLICY "favorites_self" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- ── Trigger : créer un profil à l'inscription ───────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Index pour les performances ─────────────────────────────

CREATE INDEX IF NOT EXISTS idx_generations_user ON public.generations(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user   ON public.favorites(user_id);
