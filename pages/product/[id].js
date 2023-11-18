import { useContext } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { BiSolidCart } from "react-icons/bi";

import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import { CartContext } from "@/providers/CartContext";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-3">
            <div className="bg-white rounded-lg p-7">
              <ProductImages images={product.images} />
            </div>
            <div className=" rounded-lg p-7 pt-0">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-sm font-medium my-3">{product.description}</p>
              <div className="flex gap-10 items-center">
                <div>
                  <span className="font-medium text-gray-600 items-center text-lg">
                    {Number(product.price).toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div>
                  <Button
                    className="text-lg py-1.5 px-2 md:px-5 bg-yellow-700 "
                    onClick={() => addProduct(product._id)}
                  >
                    <BiSolidCart size={20} className="mr-0.5 md:mr-1" />
                    Add to card
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
