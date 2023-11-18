import About from "@/components/About";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";

import { mongooseConnect } from "@/lib/mongoose";
import { Billboard } from "@/models/Billboard";
import { Product } from "@/models/Product";

export default function HomePage({ featuredProduct, newProducts, newAbout }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <About newAbout={newAbout} />
      <NewProducts products={newProducts} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "655591ed1ff04fabed6798be";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const newAbout = await Billboard.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      newAbout: JSON.parse(JSON.stringify(newAbout)),
    },
  };
}
