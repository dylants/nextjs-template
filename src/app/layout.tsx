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
      <body className="flex h-screen w-screen items-center justify-center">
        <AppContextProvider>
          <main className="flex flex-col flex-1 md:items-center mb-12">
            <div className="w-full h-full px-4 md:w-[768px] md:px-0">
              {children}
            </div>
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
