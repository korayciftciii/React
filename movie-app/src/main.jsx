import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.jsx'
import StartRating from './StartRating.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <StartRating maxRating={7} />
  </StrictMode>,
)
