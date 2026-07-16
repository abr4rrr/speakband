import type { Metadata } from 'next';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { APP_NAME } from '@/lib/constants';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${APP_NAME} — AI-Powered IELTS Speaking Practice`,
  description:
    'Practice IELTS Speaking Parts 1, 2 & 3 and get instant AI-powered band scores aligned with British Council IELTS assessment criteria. Transcription, corrections, and Band 8-9 model answers in under a minute.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-paper font-body text-ink antialiased">
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-73px)] max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      </body>
    </html>
  );
}
