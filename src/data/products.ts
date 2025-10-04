// src/data/products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cosmic Voyager Tee",
    price: 29.99,
    imageUrl: "/shirts/shirt1.jpg", // We will add these images next
    description: "A soft cotton tee featuring a stunning cosmic design. Perfect for dreamers and explorers.",
  },
  {
    id: 2,
    name: "Minimalist Wave Shirt",
    price: 24.99,
    imageUrl: "/shirts/shirt2.jpg",
    description: "Embrace simplicity with this clean, stylish wave graphic shirt. Made from 100% organic cotton.",
  },
  {
    id: 3,
    name: "Urban Explorer Graphic",
    price: 34.99,
    imageUrl: "/shirts/shirt3.jpg",
    description: "A bold graphic tee for the modern city dweller. Comfortable, durable, and stylish.",
  },
  {
    id: 4,
    name: "Vintage Sunset Tee",
    price: 27.99,
    imageUrl: "/shirts/shirt4.jpg",
    description: "Capture the vibe of a retro sunset with this super-soft, vintage-inspired t-shirt.",
  },
  {
    id: 5,
    name: "Vintage Sunset Tee",
    price: 27.99,
    imageUrl: "/shirts/shirt5.jpg",
    description: "Capture the vibe of a retro sunset with this super-soft, vintage-inspired t-shirt.",
  },
  {
    id: 6,
    name: "Vintage Sunset Tee",
    price: 27.99,
    imageUrl: "/shirts/shirt6.jpg",
    description: "Capture the vibe of a retro sunset with this super-soft, vintage-inspired t-shirt.",
  },
  {
    id: 7,
    name: "Cosmic Voyager Tee",
    price: 29.99,
    imageUrl: "/shirts/shirt1.jpg", // We will add these images next
    description: "A soft cotton tee featuring a stunning cosmic design. Perfect for dreamers and explorers.",
  },
  {
    id: 8,
    name: "Minimalist Wave Shirt",
    price: 24.99,
    imageUrl: "/shirts/shirt2.jpg",
    description: "Embrace simplicity with this clean, stylish wave graphic shirt. Made from 100% organic cotton.",
  },
  {
    id: 9,
    name: "Urban Explorer Graphic",
    price: 34.99,
    imageUrl: "/shirts/shirt3.jpg",
    description: "A bold graphic tee for the modern city dweller. Comfortable, durable, and stylish.",
  },
  {
    id: 10,
    name: "Vintage Sunset Tee",
    price: 27.99,
    imageUrl: "/shirts/shirt4.jpg",
    description: "Capture the vibe of a retro sunset with this super-soft, vintage-inspired t-shirt.",
  },
  {
    id: 11,
    name: "Vintage Sunset Tee",
    price: 27.99,
    imageUrl: "/shirts/shirt5.jpg",
    description: "Capture the vibe of a retro sunset with this super-soft, vintage-inspired t-shirt.",
  },
  {
    id: 12,
    name: "Vintage Sunset Tee",
    price: 27.99,
    imageUrl: "/shirts/shirt6.jpg",
    description: "Capture the vibe of a retro sunset with this super-soft, vintage-inspired t-shirt.",
  },
];