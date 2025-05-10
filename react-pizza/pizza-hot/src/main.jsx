import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartContextProvider } from "./contexts/CartContext";
import { UIContextProvider } from "./contexts/UIContext";
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIContextProvider>
      <ThemeProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ThemeProvider>
    </UIContextProvider>
  </StrictMode>,
)
