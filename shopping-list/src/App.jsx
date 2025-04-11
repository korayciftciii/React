import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/ItemList";
import Footer from "./components/Footer";

function App() {
  const[items,setItems]=useState([]);
  
  function handleAddItem(item){
    setItems((items)=> [...items,item]);  
  }
  function handleDeleteItem(id){
    setItems((items)=> items.filter((item)=> item.id !== id));
  }
  function handleUpdateItemStatus(id){
    setItems((items)=> items.map((item)=> item.id === id ? {...item,completed:!item.completed}: item));
  }
  function handleClearAll(){
    setItems([]);
  }
  return (
 <div className='app'>
     <Header/>
    <Form onAddItem={handleAddItem} onClearAll={handleClearAll}/>
    <List items={items} onDeleteItem={handleDeleteItem} onUpdateItemStatus={handleUpdateItemStatus}/>
    <Footer items={items}/>
  </div>
  );
}






export default App
