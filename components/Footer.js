import Center from "@/components/Center";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div className="bg-black pt-10 pb-1">
        <Center>
          <h1 className="text-2xl font-bold text-yellow-700 my-5">
            CamVanBakery
          </h1>
          <div className="grid md:grid-cols-2">
            <div className="leading-8">
              <h2 className="text-2xl text-slate-300 font-medium">Menu</h2>
              <ul>
                <li>
                  <Link href={"/products"} className="flex items-center">
                    <HiOutlineArrowNarrowRight size={18} className="mr-1" />
                    All products
                  </Link>
                </li>
                <li>
                  <Link href={"/categories"} className="flex items-center">
                    <HiOutlineArrowNarrowRight size={18} className="mr-1" />
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href={"/cart"} className="flex items-center">
                    <HiOutlineArrowNarrowRight size={18} className="mr-1" />
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl text-slate-300 font-medium mt-5 md:mt-0">
                Contact Us
              </h2>
              <div className="mt-5">
                <p className=" text-slate-300">
                  Hotline:{" "}
                  <span className="text-yellow-700 font-medium">123456789</span>
                </p>
                <p className="text-slate-300 mt-5">
                  Address:{" "}
                  <span className="text-yellow-700 font-medium">
                    Tổ 10, Đường Bắc Sơn, Phường Hoàng Văn Thụ, TP.Thái Nguyên
                  </span>{" "}
                </p>
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-slate-300">
                  FOLLOW US ON
                </h2>
                <div className="flex gap-3 mt-3 text-yellow-700">
                  <Link
                    href={"https://www.facebook.com/camvanbakery"}
                    className="hover:text-yellow-500 p-3"
                  >
                    <FaFacebookF size={23} />
                  </Link>
                  <Link href={"/"} className="hover:text-yellow-500 p-3">
                    <FaInstagram size={23} />
                  </Link>
                  <Link href={"/"} className="hover:text-yellow-500 p-3">
                    <FaTiktok size={23} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 text-slate-300">
            &copy; {new Date().getFullYear()} CamVanBakery, Inc. All rights
            reserved.
          </div>
        </Center>
      </div>
    </>
  );
}
