import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import { CartProvider } from "../components/cart/cartcontext";
import { SessionProvider } from "next-auth/react";
import Body from "../components/body";

export default function App({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Header />
        <Body Component={Component} pageProps={pageProps} />
        <Footer />
      </CartProvider>
    </SessionProvider>
  );
}
