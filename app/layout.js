export const metadata = {
  title: 'Générateur de Prénoms Magique 👶',
  description: 'Découvrez le prénom idéal pour votre enfant grâce à l\'intelligence artificielle !',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
