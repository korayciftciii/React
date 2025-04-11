const items=[
  {id:1, name:'item1', quantity:1, completed:false},
  {id:2, name:'item2', quantity:2, completed:false},
  {id:3, name:'item3', quantity:1, completed:false},
  {id:4, name:'item4', quantity:4, completed:true},
  {id:5, name:'item5', quantity:2, completed:true},
];


function App() {
  return (
 <div className='app'>
     <Header/>
    <Form/>
    <List/>
  </div>
  );
}

function Header(){
return(
  <h1>🛒 Shopping List</h1>
);
}
function Form(){
return(
  <form className='form'>
    <input type="text" placeholder="Add item" />
    <select >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button type="submit">Add</button>
  </form>
);
}

function List(){
  return(
    <div className='list'>
    <ul>
          {items.map((item,index) => (<Item item={item} key={index}/>))}
    </ul>  
    </div>
  );
}
function Item({item}){
  return(
  <li>
    <span style={item.completed ? {textDecoration:"line-through"} : {}}>{item.name}</span>
    <button>X</button>
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
