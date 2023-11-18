import Center from "./Center";
import HeadTitle from "@/components/HeadTitle";
import ProductsGrid from "@/components/ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <div>
      <Center>
        <HeadTitle>Categories</HeadTitle>
        <ProductsGrid products={products} />
      </Center>
    </div>
  );
}
