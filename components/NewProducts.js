import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <div>
      <Center>
        <h2 className="text-3xl font-bold py-6">New Arrivals</h2>
        <ProductsGrid products={products} />
      </Center>
    </div>
  );
}
