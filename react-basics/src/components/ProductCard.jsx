export  function ProductCard(props) {
  
    if(props.productObj.is_available){
return (
<div className='card shadow-sm'>
  <img className='card-img-top p-2 p-md-3 border-bottom' src={"/img/"+props.productObj.product_image} alt={props.productObj.product_image_alt} />
  <div className='card-body'>
  <h2 className='card-title'>{props.productObj.product_name}</h2>
  <p className='card-text'>{props.productObj.product_description}</p>
  <span className='badge text-bg-success'>$ {props.productObj.product_price}</span>
  </div>
</div>);
    }
    else return null;

  
}