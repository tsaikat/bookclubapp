import Footer from '../components/footer'
import Navbar from '../components/navbar'
import 'bootstrap/dist/css/bootstrap.css'


export default function App({ Component, pageProps }) {
  return (
    <div>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </div>
  )
}
