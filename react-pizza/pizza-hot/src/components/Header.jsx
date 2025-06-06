import { useCallback, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { cartContext } from "../contexts/CartContext";
import { UIContext } from "../contexts/UIContext";

export default function Header() {
  const { color, setColor } = useContext(ThemeContext)
  const { items } = useContext(cartContext)
  const { showCart } = useContext(UIContext)
  const totalCartItems = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <header>
      <nav
        className={`navbar navbar-expand bg-${color} border-bottom border-body`}
        data-bs-theme="dark"
      >
        <div className="container">
          <a href="#" className="navbar-brand">
            🍕 Pizza Hot
          </a>
          <button className="btn btn-dark" onClick={() => showCart()}>
            <i className="bi bi-cart3"></i>
            <span className="ms-2">({totalCartItems})</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
