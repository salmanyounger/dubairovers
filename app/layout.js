import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import MobileAppNav from "./components/MobileAppNav";
import ErrorBoundary from "./components/ErrorBoundary";
import DOMPatch from "./components/DOMPatch";

export const metadata = {
  metadataBase: new URL("https://dubairovers.com"),
  title: {
    default: "Dubai Rovers — Best Tours in Dubai",
    template: "%s | Dubai Rovers",
  },
  description: "Desert safaris, hot air balloons, dhow cruises & more with hotel pickup included. Dubai's #1 rated adventure platform.",
  keywords: ["Dubai tours", "desert safari Dubai", "hot air balloon Dubai", "dhow cruise Dubai", "Dubai tourism", "Dubai activities"],
  authors: [{ name: "Salman Ali", url: "https://dubairovers.com" }],
  creator: "Salman Ali",
  publisher: "Dubai Rovers",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://dubairovers.com",
    siteName: "Dubai Rovers",
    title: "Dubai Rovers — Best Tours in Dubai",
    description: "Desert safaris, hot air balloons, dhow cruises & more. Hotel pickup included.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dubai Rovers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Rovers — Best Tours in Dubai",
    description: "Desert safaris, hot air balloons, dhow cruises & more. Hotel pickup included.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://dubairovers.com" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <DOMPatch />
        <NavbarWrapper />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <MobileAppNav />
      </body>
    </html>
  );
}
