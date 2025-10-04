// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import AnimatePresenceWrapper from "@/components/style/AnimatePresenceWrapper";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OP-SHIRT | Your Favorite Shirts",
  description: "High-quality, stylish shirts for every occasion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" > {/* You can add 'dark' for a dark theme */}
      <body className={inter.className}>
        <CartProvider>
          <Header /> {/* <-- ADD HEADER HERE */}
          <AnimatePresenceWrapper>
            {/* We wrap children in a main tag for semantic HTML and styling */}
            <main className="min-h-screen">
              {children}
            </main>
          </AnimatePresenceWrapper>
          <Footer /> {/* <-- ADD FOOTER HERE */}
        </CartProvider>
      </body>
    </html>
  );
}