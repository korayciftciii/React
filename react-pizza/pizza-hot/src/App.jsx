import { useContext } from "react";
import Header from "./components/Header";
import PizzaList from "./components/PizzaList";
import ThemeSelector from "./components/ThemeSelector";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";

export default function App() {
  const { mode } = useContext(ThemeContext);
  return (
    <div className={`${mode === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Header />
      <ThemeSelector />
      <div className="container my-4">
        <PizzaList />
        <Cart />
        <Checkout />
      </div>
    </div>
  );
}
