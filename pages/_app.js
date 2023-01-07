import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/header'


export default function App({ Component, pageProps }) {
  return (
    <div>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
    </div>
  )
}
