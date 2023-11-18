import Link from "next/link";
import Center from "./Center";
import HeadTitle from "@/components/HeadTitle";

export default function CategoryList({ categories }) {
  console.log(categories);

  return (
    <div>
      <Center>
        <HeadTitle>Categories</HeadTitle>
        <Link
          href={"/categories"}
          className="flex flex-col md:flex-row gap-10 my-10"
        >
          {categories.map((category) => (
            <div key={category._id} className="w-full ">
              <div
                key={`${category._id}-image`}
                className="bg-white p-6 flex flex-col"
              >
                {category.products.length > 0 && (
                  <div className="flex justify-center h-full">
                    <img
                      src={category.products[0].images[0]}
                      alt={category.products[0].name}
                      className="max-w-full max-h-80 border px-10 rounded-md"
                    />
                  </div>
                )}
                <h2 className="flex justify-center text-4xl text-yellow-600 font-serif my-5">
                  {category.name}
                </h2>
                {category.products.length > 0 && (
                  <p className="text-gray-500 font-medium flex-grow">
                    {category.products[0].description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Link>
      </Center>
    </div>
  );
}
