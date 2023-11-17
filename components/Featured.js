import { BiSolidCart } from "react-icons/bi";
import Link from "next/link";
import { useContext } from "react";
import { Typewriter } from "react-simple-typewriter";

import Center from "@/components/Center";
import Button from "@/components/Button";
import { CartContext } from "@/providers/CartContext";
import toast from "react-hot-toast";

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    try {
      addProduct(product._id);
      toast.success("Add to cart successfully");
    } catch (error) {
      toast.error("Add to cart failed");
    }
  }

  return (
    <div className="bg-black py-20 text-white">
      <Center>
        <div
          className="grid lg:grid-cols-2 gap-16 items-center
         md:grid-cols-2 sm:grid-cols-1"
        >
          <div>
            <h1 className="font-bold text-5xl mb-4">
              <Typewriter
                words={[product.title]}
                cursor
                loop={0}
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h1>
            <p className="text-gray-300 text-sm">{product.description}</p>
            <div className="flex gap-4 mt-7">
              <Link href={"/product/" + product._id}>
                <Button
                  className=" bg-transparent text-lg text-white
             border py-2 px-6"
                >
                  Read more
                </Button>
              </Link>
              <Button
                className="text-lg py-2 px-6 bg-yellow-700 "
                onClick={addFeaturedToCart}
              >
                <BiSolidCart size={20} className="mr-1" />
                Add to card
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://camvanbakery.s3.amazonaws.com/1699597645924.png"
              alt=""
              className="max-w-full"
            />
          </div>
        </div>
      </Center>
    </div>
  );
}
