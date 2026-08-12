import React, { StrictMode } from 'react' // Import React here
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './components/cart/CartContext.jsx'
import { ThemeProvider } from './components/ThemeContext/ThemeContext.jsx' // <-- IMPORT ADDED HERE

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* <-- WRAPPER ADDED HERE */}
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider> {/* <-- WRAPPER CLOSED HERE */}
    </BrowserRouter>
  </StrictMode>,
)