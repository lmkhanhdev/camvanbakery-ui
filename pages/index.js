import About from "@/components/About";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CategoryList from "@/components/CategoryList";

import { mongooseConnect } from "@/lib/mongoose";
import { Billboard } from "@/models/Billboard";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Sharing from "@/components/Sharing";

export default function HomePage({
  featuredProduct,
  newAbout,
  categoriesWithProducts,
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <About newAbout={newAbout} />
      <CategoryList categories={categoriesWithProducts} />
      <Sharing />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "655591ed1ff04fabed6798be";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const products = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const newAbout = await Billboard.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const categories = await Category.find({}, null, { sort: { _id: -1 } });

  const categoriesWithProducts = categories.map((category) => {
    const categoryProducts = products.filter((product) =>
      product.category.equals(category._id)
    );
    return {
      _id: category._id.toString(),
      name: category.name,
      products: JSON.parse(JSON.stringify(categoryProducts)),
    };
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newAbout: JSON.parse(JSON.stringify(newAbout)),
      categoriesWithProducts,
    },
  };
}
