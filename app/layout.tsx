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
  title: `${APP_NAME} — IELTS Speaking Answer Checker`,
  description:
    'Record your IELTS Speaking Part 1, 2, or 3 answers and get an instant band score, transcription, corrections, and a model answer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-paper font-body text-ink antialiased">
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-73px)] max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
