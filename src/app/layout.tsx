
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { AppShell } from '@/components/layout/app-shell';
import { AuthProvider } from '@/contexts/AuthContext'; // Added AuthProvider

export const metadata: Metadata = {
  title: 'Ledger Lite',
  description: 'Modern Accounting App for Small Businesses',
  icons: {
    icon: '/favicon.ico', // Assuming you might add a favicon later
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`font-sans antialiased`}>
        <AuthProvider> {/* Wrapped with AuthProvider */}
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
