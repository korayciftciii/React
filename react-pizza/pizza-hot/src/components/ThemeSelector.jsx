const themeColors = ['danger', 'primary', 'success', 'warning', 'info', 'dark', 'secondary'];
import { useContext } from "react";
import "./themeSelector.css";
import { ThemeContext } from "../contexts/ThemeContext";
export default function ThemeSelector() {
    const { changeColor, mode, changeMode } = useContext(ThemeContext);
    function changeThemeMode() {
        changeMode(mode === "light" ? "dark" : "light");
    }
    return (
        <div className="container theme-selector">
            <div className="moded-toggle">
                <i className={`bi bi-moon-stars${mode === "dark" ? "-fill" : ""}`} onClick={changeThemeMode}></i>
            </div>
            <div className="theme-links">
                {
                    themeColors.map((color, index) => (
                        <span key={index} className={`bg-${color}`} onClick={() => changeColor(color)}></span>
                    ))
                }
            </div>
        </div>
    )
}