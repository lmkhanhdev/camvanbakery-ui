import Link from "next/link";
import { useContext } from "react";

import Button from "@/components/Button";
import { CartContext } from "@/providers/CartContext";
import toast from "react-hot-toast";

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  function addProductToCart() {
    try {
      addProduct(_id);
      toast.success("Add to cart successfully");
    } catch (error) {
      toast.error("Add to cart failed");
    }
  }

  return (
    <div>
      <Link
        href={"/product/" + _id}
        className="bg-white p-8 h-60 text-center flex
       items-center justify-center rounded-lg"
      >
        <div className="">
          <img src={images[0]} alt="" className="max-w-full max-h-60" />
        </div>
      </Link>
      <div className="mt-4">
        <Link href={"/product/" + _id}>
          <h2 className="text-lg font-medium text-center">{title}</h2>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-lg text-gray-600">
            {Number(price).toLocaleString("vi-VN")}đ
          </div>
          <Button
            onClick={addProductToCart}
            className="text-sm py-2 px-4 text-yellow-700 btn-add-cart font-bold"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
