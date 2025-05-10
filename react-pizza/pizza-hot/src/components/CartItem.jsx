export default function cartItem({ item, addItem, removeItem }) {
    return (
        <li className="cart-item border-bottom">
            <p>
                {item.title} - {item.quantity} x {item.price} = {item.quantity * item.price} ₺
            </p>
            <div className="actions">
                <button className="btn btn-sm btn-outline-primary" onClick={() => removeItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn btn-sm btn-outline-primary" onClick={() => addItem(item)}>+</button>
            </div>
        </li>
    )
}