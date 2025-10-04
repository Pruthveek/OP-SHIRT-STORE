// src/components/ProductCard.tsx
"use client"; // Add this to use hooks and event handlers
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "../style/MotionWrap";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <MotionDiv whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <Link
          href={`/product/${product.id}`}
          className="flex flex-col flex-grow"
        >
          <CardHeader className="px-4">
            <div className="aspect-square relative overflow-hidden">
              <MotionDiv
              >
                <Image
                  layout={`product-image-${product.id}`} // ADD THIS
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg "
                />
              </MotionDiv>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg">{product.name}</CardTitle>
          </CardContent>
        </Link>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <p className="font-bold text-xl">${product.price}</p>
          <Button>Add to Cart</Button>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}
