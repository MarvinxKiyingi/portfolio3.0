import type { Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeScript } from './components/ThemeScript';
import { Analytics } from '@vercel/analytics/next';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusJakartaSans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${syne.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className='bg-light-500 text-light-900 dark:bg-dark-500 dark:text-white'>
        <ThemeScript />
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
