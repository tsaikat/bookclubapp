import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/header'
import { CartProvider } from '../components/cart/cartcontext'


export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
    </CartProvider>
  )
}
