import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductsPage({ products }) {
  return (
    <>
      <div className="mt-16">
        <Header />
        <Center>
          <h1 className="font-extrabold text-3xl py-6">All products</h1>
          <ProductsGrid products={products} />
        </Center>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
