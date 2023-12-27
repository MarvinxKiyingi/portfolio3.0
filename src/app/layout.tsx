import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import './styles/scss/globals.scss';
import Footer from './components/Footer/Footer';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dn-sans' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Marvin Kiyingi',
  description:
    'Front-end developer based in Stockholm, creating adaptive interfaces with sustainable code and user-centric design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${dmSans.variable} ${inter.className}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
