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
  title: "Kitty KIT - Premium Lipstick | Luxury Beauty",
  description: "Discover Kitty KIT premium lipsticks in Pink and Red. Get up to 45% off on bundle deals.",
  keywords: ["lipstick", "makeup", "beauty", "kitty kit", "luxury lipstick", "pink lipstick", "red lipstick", "european beauty", "cruelty free makeup"],
  authors: [{ name: "Kitty KIT" }],
  creator: "Kitty KIT",
  publisher: "Kitty KIT",
  metadataBase: new URL('https://kittykit.hot'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kitty KIT - Premium Lipstick",
    description: "Luxury lipsticks in Pink and Red. Special bundle offers up to 45% off!",
    url: 'https://kittykit.hot',
    siteName: 'Kitty KIT',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kitty KIT Premium Lipstick',
      },
    ],
    locale: 'en_EU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitty KIT - Premium Lipstick',
    description: 'Luxury lipsticks with up to 45% off on bundles!',
    images: ['/og-image.jpg'],
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
