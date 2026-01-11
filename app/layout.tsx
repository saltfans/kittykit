import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kitty KIT - Premium Lip Kits | Liner + Gloss Sets",
  description: "Complete lip kits with precision liner & lustrous gloss. Set Gorgeous & Set Leading Lady. Cruelty-free, long-lasting formula. Save up to €37 on bundles!",
  keywords: ["lip kit", "lip liner", "lip gloss", "kitty kit", "makeup", "beauty", "set gorgeous", "set leading lady", "luxury lip kit", "cruelty free makeup", "european beauty"],
  authors: [{ name: "Kitty KIT" }],
  creator: "Kitty KIT",
  publisher: "Kitty KIT",
  metadataBase: new URL('https://kittykit.hot'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kitty KIT - Premium Lip Kits",
    description: "Complete lip kits with liner + gloss. Set Gorgeous & Set Leading Lady. Save up to €37!",
    url: 'https://kittykit.hot',
    siteName: 'Kitty KIT',
    images: [
      {
        url: '/KKIT/beautysetup.jpg',
        width: 1200,
        height: 630,
        alt: 'Kitty KIT Premium Lip Kits',
      },
    ],
    locale: 'en_EU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitty KIT - Premium Lip Kits',
    description: 'Complete lip kits with liner + gloss. Save up to €37!',
    images: ['/KKIT/beautysetup.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
