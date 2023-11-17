import { useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Button from "@/components/Button";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    // Kiểm tra nếu độ dài của `searchTerm` là ít nhất 1 ký tự
    if (searchTerm.length >= 1) {
      // Gọi API tìm kiếm và cập nhật searchResults
      const response = await fetch(`/api/search?term=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.results);
    } else {
      // Nếu `searchTerm` có ít hơn 1 ký tự, reset searchResults
      setSearchResults(null);
    }
  };

  return (
    <>
      <Header />
      <Center>
        <div className="mt-20 flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-7/12 h-full mb-0 p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            className="bg-slate-700 text-sm px-3 py-0.5 ml-3"
          >
            Search
          </Button>
        </div>
        {searchResults ? (
          searchResults.length > 0 ? (
            <ProductsGrid products={searchResults} />
          ) : (
            <div className="flex justify-center items-center mt-10">
              <p className="text-lg font-medium text-gray-600">
                No products found.
              </p>
            </div>
          )
        ) : null}
      </Center>
    </>
  );
}
