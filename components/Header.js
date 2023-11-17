import Link from "next/link";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "../providers/CartContext";
import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All products" },
    { href: "/categories", label: "Categories" },
    { href: "/cart", label: `Cart (${cartProducts.length})` },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black shadow-md w-full fixed top-0 left-0">
      <Center>
        <div className="md:flex items-center justify-between">
          <Link
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h2 className="text-3xl py-3 text-yellow-600 font-serif font-extrabold">
              CamVanBakery
            </h2>
          </Link>

          <div className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden">
            <IoMdMenu
              onClick={toggleMenu}
              className="relative flex items-center p-2 w-10 h-10 justify-center
               text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            />
          </div>

          <ul
            className={`font-medium flex-col pb-2 flex md:flex-row md:space-x-8 rtl:space-x-reverse ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-gray-400 font-medium  ${
                    router.pathname === link.href ? "text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={"/search"} className="flex gap-6 ">
                <IoSearch size={20} className=" text-slate-300" />
              </Link>
            </li>
          </ul>
        </div>
      </Center>
    </header>
  );
}
