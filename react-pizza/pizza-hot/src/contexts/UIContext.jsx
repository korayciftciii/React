import { createContext, useState } from "react";

export const UIContext = createContext();

export function UIContextProvider({ children }) {
    const [UIProgress, setUIProgress] = useState('');
    function showCart() {
        setUIProgress('cart');
    }
    function hideCart() {
        setUIProgress('');
    }
    function showCheckout() {
        setUIProgress('checkout');
    }
    function hideCheckout() {
        setUIProgress('');
    }
    const UIContextValue = {
        UIProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };
    return (
        <UIContext.Provider value={UIContextValue}>
            {children}
        </UIContext.Provider>
    )
}