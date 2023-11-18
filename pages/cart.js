import { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BsTrash3 } from "react-icons/bs";

import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";

import { CartContext } from "@/providers/CartContext";

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    removeProduct,
    removeProductCart,
    clearCart,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function handleRemoveFromCart(id) {
    localStorage.clear();
    removeProductCart(id);
    // Lấy sản phẩm cuối cùng trong cartProducts
    const lastProduct = cartProducts[cartProducts.length - 1];
    // Nếu sản phẩm cuối cùng trùng với productId, hãy xóa nó khỏi mảng cartProducts
    if (lastProduct === id) {
      cartProducts.pop();
    }
  }

  async function Checkout() {
    try {
      const response = await axios.post("/api/checkout", {
        name,
        phone,
        date,
        time,
        address,
        note,
        cartProducts,
      });
      clearCart();
      localStorage.clear();
      toast.success("Thanks for your order!");

      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      toast.error("Order faild");
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <div className="mt-16">
        <Header />
        <Center>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-3">
            <div className="bg-white rounded-lg p-7 col-span-1 md:col-span-2 padding">
              <h2 className="text-3xl mb-8 font-extrabold">Cart</h2>
              {cartProducts?.length === 0 ? (
                <h2 className="text-center text-lg font-medium text-gray-500">
                  Your cart is empty
                </h2>
              ) : (
                <table className="w-full">
                  <thead className="text-left text-gray-500 text-sm">
                    <tr>
                      <th>PRODUCT</th>
                      <th>QUANTITY</th>
                      <th>PRICE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="padding-cart">
                          <div className="w-24 h-24 border rounded-lg display-cart">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="max-width max-height"
                            />
                          </div>
                          <p className="py-1 font-medium">{product.title}</p>
                        </td>
                        <td className="padding-cart">
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                            className="bg-gray-300 px-2.5 md:px-3.5 text-black"
                          >
                            -
                          </Button>
                          <span className="px-1 font-medium">
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </span>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                            className="bg-gray-300 px-2 md:px-3 text-black"
                          >
                            +
                          </Button>
                        </td>
                        <td className="padding-cart font-medium text-gray-600">
                          {Number(
                            (
                              cartProducts.filter((id) => id === product._id)
                                .length * product.price
                            ).toFixed(0)
                          ).toLocaleString("vi-VN")}
                          đ
                        </td>
                        <td
                          onClick={() => handleRemoveFromCart(product._id)}
                          className="items-center p-2 pt-4 text-gray-700 cursor-pointer"
                        >
                          <BsTrash3 size={17} />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="padding-cart"></td>
                      <td className="text-lg font-bold text-gray-600 padding-cart">
                        Total:
                      </td>
                      <td className="font-medium text-gray-600 items-center padding-cart">
                        {Number(total).toLocaleString("vi-VN")}đ
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            {cartProducts?.length > 0 && (
              <div className="bg-white rounded-lg p-7">
                <h2 className="text-2xl font-bold flex justify-center pb-4">
                  Order information
                </h2>
                <h3>Name</h3>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <h3>Phone</h3>
                <input
                  type="number"
                  placeholder="phone"
                  name="phone"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
                <h3>Delivery date</h3>
                <input
                  type="date"
                  placeholder="delivery date"
                  name="date"
                  value={date}
                  onChange={(ev) => setDate(ev.target.value)}
                />
                <h3>Time frame</h3>
                <select
                  name="thoi_gian"
                  value={time}
                  onChange={(ev) => setTime(ev.target.value)}
                >
                  <option value="">-- Chọn thời gian --</option>
                  <option value="11h15 – 13h00">11h15 – 13h00</option>
                  <option value="13h00 – 15h00">13h00 – 15h00</option>
                  <option value="15h00 – 17h00">15h00 – 17h00</option>
                  <option value="18h00 – 20h00">18h00 – 20h00</option>
                </select>
                <h3>Address</h3>
                <textarea
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                />
                <h3>Note</h3>
                <textarea
                  value={note}
                  onChange={(ev) => setNote(ev.target.value)}
                />
                <div className="flex justify-center items-center mt-3">
                  <h2 className="text-lg font-bold text-gray-600 mr-3">
                    Total:
                  </h2>
                  <span className="font-medium text-gray-600">
                    {Number(total).toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <Button
                  onClick={Checkout}
                  className="bg-yellow-700 mt-6 w-full flex justify-center"
                >
                  Order
                </Button>
              </div>
            )}
          </div>
        </Center>
      </div>
    </>
  );
}
