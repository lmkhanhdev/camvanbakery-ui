import { CartContextProvider } from "@/providers/CartContext";
import { ToasterProvider } from "@/providers/ToastProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <ToasterProvider />
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
