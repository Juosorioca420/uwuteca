import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from './CartContext';
import App from "src/api/cambia";

ReactDOM.render(
    <CartProvider>
        <App />
    </CartProvider>,
    document.getElementById('root')
);
