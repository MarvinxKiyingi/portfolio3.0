import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './styles/scss/globals.scss';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusJakartaSans',
});

export const metadata: Metadata = {
  title: 'Marvin Kiyingi',
  description:
    'I am a Stockholm-based tech enthusiast with a passion for development, design, and creating modern, functional websites. Open to opportunities outside my current city.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${syne.variable} ${plusJakartaSans.className}`}>
      <body>{children}</body>
    </html>
  );
}
