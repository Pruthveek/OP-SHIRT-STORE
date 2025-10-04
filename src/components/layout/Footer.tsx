// src/components/Footer.tsx
import { Separator } from "@radix-ui/react-separator";
import { Instagram, Shirt, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Shirt className="h-6 w-6" />
              <span className="text-xl font-bold">OP-SHIRT</span>
            </Link>
            <p className="text-sm">
              The best place to find your next favorite shirt. Unmatched quality and style.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">About Us</Link></li>
              <li><Link href="#" className="hover:underline">Contact</Link></li>
              <li><Link href="#" className="hover:underline">FAQ</Link></li>
              <li><Link href="#" className="hover:underline">Shipping & Returns</Link></li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-muted-foreground/20" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OP-SHIRT. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}