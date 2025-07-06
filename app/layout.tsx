import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Số May Mắn Phong Thủy - Tìm Số Độc Đắc',
  description: 'Ứng dụng tìm số may mắn theo phong thủy, ngũ hành và thiên can địa chi. Tìm số vé số may mắn dựa trên tên, ngày sinh và phong thủy.',
  keywords: 'số may mắn, phong thủy, vé số, ngũ hành, thiên can địa chi, số độc đắc',
  authors: [{ name: 'Lucky Number AI' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Số May Mắn Phong Thủy',
    description: 'Tìm số may mắn theo phong thủy và ngũ hành',
    type: 'website',
    locale: 'vi_VN',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen feng-shui-gradient">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
} 