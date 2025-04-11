import Item from "./Item"
export default function List({items,onDeleteItem,onUpdateItemStatus}){
    return<>
    {
      items.length === 0 ? (
        <div className="list">No Item </div>
      ) : (
        <ul className="list">
          {items.map((item) => (
            <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onUpdateItemStatus={onUpdateItemStatus} />
          ))}
        </ul>
      )
    }
    </>
  }