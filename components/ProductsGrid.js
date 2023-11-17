import ProductBox from "@/components/ProductBox";

export default function ProductsGrid({ products }) {
  return (
    <div
      className="grid gap-8 py-8 lg:grid-cols-4
    md:grid-cols-3 sm:grid-cols-2"
    >
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox {...product} key={product._id} />
        ))}
    </div>
  );
}
