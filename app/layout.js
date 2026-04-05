import './globals.css';
import Header from '@/components/header';
import AuthProvider from '@/components/auth-provider';

export const metadata = {
  title: 'Marginalia',
  description: 'A warm literary space for discovering books and publishing thoughtful reviews.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <AuthProvider>
          <div className="min-h-screen bg-[linear-gradient(180deg,rgba(246,239,226,0.86),rgba(233,223,204,0.94))]">
            <div className="pointer-events-none fixed inset-0 bg-grain bg-[size:18px_18px] opacity-[0.14]" />
            <Header />
            <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
