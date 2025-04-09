import {items} from '../data';
import {ProductCard} from './ProductCard';

export default function ProductList (){
 
  
    return (
      <div>
    {
      items.length === 0 ? <p>No products available</p> 
      : (<div className='row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4' id="product-list">
        {
          items.map((item,index) => (
            <div className='col' key={index}>
               <ProductCard  productObj={item}/>
            </div>
         
          ))
        }  
      </div>)
      
    }
    
      </div>
    );
  }