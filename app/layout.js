import Script from 'next/script'

export const metadata = {
  title: 'Générateur de Prénoms Magique 👶',
  description: 'Découvrez le prénom idéal pour votre enfant grâce à l\'intelligence artificielle !',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-28MJZ6SHZZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-28MJZ6SHZZ');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
