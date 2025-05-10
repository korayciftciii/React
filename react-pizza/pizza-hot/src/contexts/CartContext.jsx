import { createContext, useContext, useReducer, useState } from "react";
import cartReducer from "../reducers/cartReducer";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });
    function addItem(item) {
        dispatch({ type: "ADD_ITEM", item });
    }
    function removeItem(id) {
        dispatch({ type: "REMOVE_ITEM", id });
    }
    function clearCart() {
        dispatch({ type: "CLEAR_CART" });
    }
    const cartContent = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    };
    return (
        <cartContext.Provider value={cartContent}>
            {children}
        </cartContext.Provider>
    )
}