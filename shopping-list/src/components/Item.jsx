export default function Item({item,onDeleteItem,onUpdateItemStatus}){
    return <>
    {
      item.title!=="" ?(
        <li>
          <input type="checkbox" className="check" checked={item.completed} onChange={()=> onUpdateItemStatus(item.id)}/>
          <span style={item.completed ? {textDecoration:"line-through"} : {}}>{item.title} | {item.quantity}</span>
          <button onClick={()=>onDeleteItem(item.id)}>X</button>
        </li>
        ) : <div className="list">No Item </div>
    }
    </>
  }