import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

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
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
