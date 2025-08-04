import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ 
  variable: '--font-inter',
  subsets: ['latin'] 
});

export const metadata = {
  title: 'Dr. Trang | Optometry Clinic',
  description: 'Professional eye care and prescription services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} bg-gray-50`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-background">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
