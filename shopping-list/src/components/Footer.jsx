export default function Footer({items}){
    const totalItems = items.length;
    const completedItems = items.filter((item) => item.completed).length;
    return(
      <footer>
        {
          totalItems === 0 ? <p> No items in the cart</p> :
          totalItems ==completedItems ? <p>All items are purchased</p> : <p>  You have {totalItems > 0 ?totalItems  :0} products in your cart |  You have {completedItems > 0 ? completedItems : 0} products purchased</p>
        }
      </footer>
  
    );
  }