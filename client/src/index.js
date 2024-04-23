import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './providers/Cart';
import { AuthProvider } from './providers/Auth';


const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
         <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  root
);

reportWebVitals();
