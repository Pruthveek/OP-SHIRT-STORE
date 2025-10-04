
import ProductCard from "@/components/common/ProductCard";
import { MotionDiv } from "@/components/style/MotionWrap";
import { products } from "@/data/products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This will make children animate one by one
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Exclusive Shirts</h1>
      <MotionDiv
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          // Each child needs to have the item variant
          <MotionDiv key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </MotionDiv>
        ))}
      </MotionDiv>
    </main>
  );
}