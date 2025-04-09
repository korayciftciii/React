import Header from './components/Header';
import {Footer} from './components/Footer';
import ProductList from './components/ProductList';
export default function App() {
    return (
      <>
        <Header/>
        <div className='container mt-3'>
        <ProductList/>
        <Footer/>
        </div>
      </>
      
    )
  }