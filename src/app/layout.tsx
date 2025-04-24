import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WalletProviders } from "@/providers/WalletProviders";
import '@mysten/dapp-kit/dist/index.css';
import '../styles/dapp-kit-override.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "门票销售平台",
  description: "基于区块链的门票销售平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <WalletProviders>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </WalletProviders>
      </body>
    </html>
  );
}
