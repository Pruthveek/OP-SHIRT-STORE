// src/components/Header.tsx
"use client"; // We need to use client-side hooks like useCart and useState

import { useCart } from "@/context/CartContext";
import { Menu, ShoppingBag, Shirt } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { MotionDiv } from "../style/MotionWrap";
import { Button } from "../ui/button";


export default function Header() {
  const { cart, cartCount } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Shirts", href: "/" },
    { name: "Contact", href: "#" },
  ];

  return (
    // The sticky header with background blur effect
    <MotionDiv
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <header className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shirt className="h-6 w-6" />
          <span className="text-xl font-bold">OP-SHIRT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="relative">
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              {cart.length > 0 ? (
                <div className="flex h-full flex-col justify-between">
                  <div className="mt-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4">
                        {/* You might want to add a small image here */}
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-lg py-4 border-t">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <Button className="w-full">Checkout</Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-muted-foreground">Your cart is empty.</p>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Mobile Navigation Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </MotionDiv>
  );
}