import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { cartContext } from "../contexts/CartContext";

export default function Pizza({ pizza }) {
  const { color } = useContext(ThemeContext)
  const { addItem } = useContext(cartContext)
  return (
    <div className="col">
      <div className="card item">
        <img
          src={`http://localhost:3000/images/${pizza.image}`}
          alt={pizza.title}
          className="card-img-top p-2 p-md-3 border-bottom"
        />
        <div className="card-body">
          <h3 className="card-title">{pizza.title}</h3>
          <p className="card-text">
            {pizza.description}
          </p>
          <div className="item-price">
            <b>{pizza.price} ₺</b>
            <button onClick={() => addItem(pizza)} className={`btn btn-sm btn-outline-${color}`}>Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  );
}
