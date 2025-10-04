"use client";
import { MotionDiv } from "@/components/style/MotionWrap";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { addToCart } = useCart(); // Use the hook
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <MotionDiv
        className="grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="aspect-square relative">
          <Image
            layout={`product-image-${product.id}`} // ADD THIS
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <MotionDiv
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">${product.price}</p>
          </MotionDiv>
          <MotionDiv
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-muted-foreground">{product.description}</p>
          </MotionDiv>
          <MotionDiv
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={() => product && addToCart(product)}
            >
              Add to Cart
            </Button>
          </MotionDiv>
        </div>
      </MotionDiv>
    </main>
  );
}
