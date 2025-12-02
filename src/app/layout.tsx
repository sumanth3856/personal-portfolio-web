import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: 'swap', preload: false });

export const metadata: Metadata = {
  title: {
    template: '%s | My Portfolio',
    default: 'My Portfolio',
  },
  description: "Showcasing my work and skills",
  openGraph: {
    title: 'My Portfolio',
    description: 'Showcasing my work and skills',
    url: 'https://your-portfolio.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: 'https://your-portfolio.com/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col relative`}>
        <Script
          id="storage-polyfill"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var test = 'test';
                  window.localStorage.setItem(test, test);
                  window.localStorage.removeItem(test);
                  window.sessionStorage.setItem(test, test);
                  window.sessionStorage.removeItem(test);
                } catch (e) {
                  console.warn('Storage access blocked. Using polyfill.');
                  var mockStorage = {
                    getItem: function() { return null; },
                    setItem: function() { },
                    removeItem: function() { },
                    clear: function() { },
                    length: 0,
                    key: function() { return null; }
                  };
                  Object.defineProperty(window, 'localStorage', { value: mockStorage, configurable: true, writable: true });
                  Object.defineProperty(window, 'sessionStorage', { value: mockStorage, configurable: true, writable: true });
                }
              })();
            `,
          }}
        />
        <Providers>
          <GlobalErrorHandler>
            {/* Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="blob blob-1"></div>
              <div className="blob blob-2"></div>
              <div className="blob blob-3"></div>
            </div>

            <Navbar />
            <main className="flex-grow pt-20 relative z-10">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" theme="system" />
          </GlobalErrorHandler>
        </Providers>
      </body>
    </html>
  );
}
