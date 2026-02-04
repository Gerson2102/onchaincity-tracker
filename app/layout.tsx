import type { Metadata, Viewport } from "next";
import { Outfit, Cormorant } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "OnchainCity Tracker",
    template: "%s | OnchainCity Tracker",
  },
  description: "Measuring the programmable future of nations.",
  openGraph: {
    title: "OnchainCity Tracker",
    description: "Measuring the programmable future of nations.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFBF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable}`}
    >
      <body className="antialiased flex flex-col min-h-screen bg-cream text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-cream focus:rounded-full focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
