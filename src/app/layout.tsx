import AppContextProvider from '@/app/AppContextProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  description: '',
  title: 'Next.js Template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
