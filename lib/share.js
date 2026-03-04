// lib/share.js

/**
 * Encode la liste de favoris dans l'URL (pas de backend nécessaire)
 * → prenom-magique.app/share?d=base64...
 */
export function generateShareUrl(favorites) {
  const payload = JSON.stringify(favorites.map(f => ({
    p: f.prenom,
    s: f.signification,
    o: f.origine,
  })))
  const encoded = btoa(unescape(encodeURIComponent(payload)))
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/share?d=${encoded}`
  return url
}

/**
 * Decode une URL partagée
 */
export function decodeShareUrl(encoded) {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    const raw  = JSON.parse(json)
    return raw.map(r => ({ prenom: r.p, signification: r.s, origine: r.o }))
  } catch {
    return []
  }
}

/**
 * Copie l'URL dans le presse-papier
 */
export async function copyShareUrl(favorites) {
  const url = generateShareUrl(favorites)
  await navigator.clipboard.writeText(url)
  return url
}
