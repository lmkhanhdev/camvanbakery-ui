import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        if (prev.filter((value) => value === productId).length > 1) {
          // Nếu có nhiều hơn 1 sản phẩm có productId trong giỏ hàng, thực hiện việc loại bỏ
          return prev.filter((value, index) => index !== pos);
        }
      }
      return prev;
    });
  }

  function removeProductCart(productId) {
    setCartProducts((prev) => prev.filter((value) => value !== productId));
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        removeProductCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
