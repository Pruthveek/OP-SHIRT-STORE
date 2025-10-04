// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import AnimatePresenceWrapper from "@/components/style/AnimatePresenceWrapper";
import Footer from "@/components/layout/Footer";
import { Skiper19 } from "@/components/layout/backgroundline";

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
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="relative">
            {/* <CrowdCanvas src={"/images/peeps/all-peeps.png"} /> */}
            <div className="relative z-10">
              <Header />
              <Skiper19 />
              <AnimatePresenceWrapper>
                <main className="min-h-screen">{children}</main>
              </AnimatePresenceWrapper>
              <Footer />
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
