import { createContext, useReducer, useState } from "react";
import { themeReducer } from "../reducers/themeReducer";

export const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, { color: "primary", mode: "light" });
    function changeColor(color) {
        dispatch({ type: "CHANGE_COLOR", payload: color });
    }
    function changeMode(value) {
        dispatch({ type: "CHANGE_MODE", payload: value });
    }
    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    );
}