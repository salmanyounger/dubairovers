import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ErrorBoundary from "./components/ErrorBoundary";

export const metadata = {
  metadataBase: new URL("https://dubairovers.com"),
  title: { default: "Dubai Rovers — Best Tours in Dubai", template: "%s | Dubai Rovers" },
  description: "Desert safaris, hot air balloons, dhow cruises & more with hotel pickup included.",
  keywords: ["Dubai tours", "desert safari Dubai", "hot air balloon Dubai", "dhow cruise Dubai"],
  authors: [{ name: "Salman Ali", url: "https://dubairovers.com" }],
  robots: { index: true, follow: true },
  openGraph: { type:"website", locale:"en_AE", url:"https://dubairovers.com", siteName:"Dubai Rovers", title:"Dubai Rovers — Best Tours in Dubai", description:"Desert safaris, hot air balloons, dhow cruises & more.", images:[{ url:"/og-image.jpg", width:1200, height:630, alt:"Dubai Rovers" }] },
  twitter: { card:"summary_large_image", title:"Dubai Rovers — Best Tours in Dubai", description:"Desert safaris, hot air balloons, dhow cruises & more.", images:["/og-image.jpg"] },
  alternates: { canonical:"https://dubairovers.com" },
  icons: { icon:"/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fraunces:ital,wght@0,900;1,900&display=swap"/>
      </head>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <NavbarWrapper />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
