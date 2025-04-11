import { useState } from "react";



function App() {
  const[items,setItems]=useState([]);
  function handleAddItem(item){
    setItems((items)=> [...items,item]);  
  }
  function handleDeleteItem(id){
    setItems((items)=> items.filter((item)=> item.id !== id));
  }
  return (
 <div className='app'>
     <Header/>
    <Form onAddItem={handleAddItem}/>
    <List items={items} onDeleteItem={handleDeleteItem}/>
  </div>
  );
}

function Header(){
return(
  <h1>🛒 Shopping List</h1>
);
}
function Form({onAddItem}){
  const[title,setTitle]=useState("");
  const[quantity,setQuantity]=useState(1);

  function hanlderFormSubmit(e){
    e.preventDefault();
   const item={id:Date.now(),title, quantity,completed:false};  
   onAddItem(item); 
   setTitle("");
    setQuantity(1);
  };
return(
  <form className='form' onSubmit={hanlderFormSubmit}>
    <input type="text" placeholder="Add item" value={title} onChange={(e) => setTitle(e.target.value)} />
    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({length: 10},(v,i)=>i+1).map((num)=><option key={num} value={num}>{num}</option>)}
    </select>
    <button type="submit">Add</button>
  </form>
);
}

function List({items,onDeleteItem}){
  return<>
  {
    items.length === 0 ? (
      <p>No items in the cart</p>
    ) : (
      <ul className="list">
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    )
  }
  </>
}
function Item({item,onDeleteItem}){
  return(
  <li>
    <span style={item.completed ? {textDecoration:"line-through"} : {}}>{item.title}</span>
    <button onClick={()=>onDeleteItem(item.id)}>X</button>
  </li>
  );
}

function Footer(){
  return(
    <footer>
      <p>You have 10 products in your cart</p>
    </footer>

  );
}
export default App
