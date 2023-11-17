import { useState } from "react";
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";

import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Footer from "@/components/Footer";

export default function CategoriesPage({ categoriesWithProducts }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };

  return (
    <>
      <Header />
      <div className="mt-16">
        <Center>
          {categoriesWithProducts.map((category) => (
            <div
              key={category._id}
              style={{
                display:
                  selectedCategory === null || selectedCategory === category._id
                    ? "block"
                    : "none",
              }}
            >
              <h1 className="pt-5 text-3xl font-extrabold">
                {category.name}
                <Button
                  onClick={() => toggleCategory(category._id)}
                  className="text-lg text-gray-600"
                >
                  {selectedCategory === category._id ? (
                    <>
                      Show All <HiOutlineArrowNarrowLeft className="ml-1" />
                    </>
                  ) : (
                    <>
                      Show All <HiOutlineArrowNarrowRight className="ml-1" />
                    </>
                  )}
                </Button>
              </h1>
              <div className="flex justify-center items-center">
                <ProductsGrid
                  products={
                    selectedCategory === category._id
                      ? category.products
                      : category.products.slice(0, 4)
                  }
                />
              </div>
            </div>
          ))}
        </Center>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  // Fetch categories
  const categories = await Category.find({}, null, { sort: { _id: -1 } });

  // Fetch products
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  // Organize products by category
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
      categoriesWithProducts,
    },
  };
}
