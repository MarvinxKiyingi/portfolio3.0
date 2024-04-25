import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './styles/scss/globals.scss';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusJakartaSans',
});

export const metadata: Metadata = {
  openGraph: {
    title: 'Marvin Kiyingi',
    description:
      'I am a Stockholm-based tech enthusiast with a passion for development, design, and creating modern, functional websites. Open to opportunities outside my current city.',
    url: 'https://marvinkiyingi.com/',
    siteName: 'Portfolio',
    images: [
      {
        url: 'https://cdn.sanity.io/images/vdks50t2/production/0c6cb0db3d3235db794fff05d5948a65496176a1-1600x1200.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://cdn.sanity.io/images/vdks50t2/production/c6fe0594707f98561cbe7d8d727b17b742c3d0e5-2400x1260.png',
        width: 1200,
        height: 630,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
