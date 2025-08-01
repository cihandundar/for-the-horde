import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import NextAuthSessionProvider from "../../providers/NextAuthSessionProvider";
import ToastProvider from "../../providers/ToastProvider";
import StoreProvider from "./StoreProvider"; // ✅ BURAYA EKLE
import Cta from "@/components/cta/Cta";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "For The Horde",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <StoreProvider>
          <NextAuthSessionProvider>
            <Navbar />
            <ToastProvider />
            {children}
          </NextAuthSessionProvider>
          <Cta />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
