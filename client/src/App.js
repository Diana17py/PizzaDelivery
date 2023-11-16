import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPhone, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import InfoWindow from './InfoWindow';
import AddressWindow from './AddressWindow';
import Pizza from './Pizza';
import HomePage from './HomePage';
import PizzaSet from './PizzaSet';
import Drinks from './Drinks';
import Snack from './Snack';
import Cart from './Cart';
import PizzaDetails from './PizzaDetails';
import DiscountWindow from './DiscountWindow';
import CertificateWindow from './CertificateWindow';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Secret from './pages/Secret';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [categoryItemOpen, setCategoryItemOpen] = useState(false);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setCategoryItemOpen(true);
  };

  const handleCertificateClick = () => {
    setCertificateOpen(true);
  };

  const handleCertificateClose = () => {
    setCertificateOpen(false);
  };

  const handleDiscountClick = () => {
    setDiscountOpen(true);
  };

  const handleDiscountClose = () => {
    setDiscountOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleInfoClick = () => {
    setInfoOpen(true);
  };

  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const handleAddressClick = () => {
    setAddressOpen(true);
  };

  const handleAddressClose = () => {
    setAddressOpen(false);
  };

  useEffect(() => {
    const cartId = sessionStorage.getItem('cartId');
    if (!cartId) {
      axios.post('http://127.0.0.1:3001/api/cart')
        .then(response => {
          sessionStorage.setItem('cartId', response.data._id);
        })
        .catch(error => {
          console.error('Error creating cart:', error);
        });
    }
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/api/pizzas')
      .then(response => {
        setPizzas(response.data);
      })
      .catch(error => {
        console.error('Error fetching pizzas:', error);
      });
  }, []);

  const pages = [
    { name: 'Pizza', url: '/pizza', image: '/img/pizzaa.jpg' },
    { name: 'Pizza set', url: '/pizza-sets', image: '/img/sets.jpg' },
    { name: 'Snacks', url: '/snacks', image: '/img/snacks.png' },
    { name: 'Drinks', url: '/drinks', image: '/img/drinks.jpg' },
  ];

  const getRandomPizzas = () => {
    const shuffledPizzas = pizzas.sort(() => 0.5 - Math.random());
    return shuffledPizzas.slice(0, 8);
  };

  const allFrequentlyOrderedCategories = getRandomPizzas();

  const row1Pizzas = allFrequentlyOrderedCategories.slice(0, 4);
  const row2Pizzas = allFrequentlyOrderedCategories.slice(4, 8);

  
  return (
    <Router>
      <div className="App">
        <header id="top">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ color: 'black', textDecoration: 'none' }}>Pizza Place</h1>
            </Link>
          </div>
          <div className="menu">
            <button onClick={handleMenuClick} className="menu-button">
              Delivery menu
            </button>
          </div>
          <div className="delivery-info">
            <span>
              <FontAwesomeIcon icon={faClock} /> 10:00-22:50
            </span>
            <span onClick={handleInfoClick} className="info-icon">
              <i className="fas fa-truck"></i> Information
            </span>
            <span onClick={handleAddressClick} className="info-icon">
              <i className="fas fa-map-marker-alt"></i> Address
            </span>
            <span>
              <FontAwesomeIcon icon={faPhone} /> +123456789
            </span>
            <Link to="/cart" /*onClick={handleCartClick}*/ className="link-style">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Link>
            <Link to="/register" className="link-style">
              <FontAwesomeIcon icon={faUser} /> Register
            </Link>  
            {infoOpen && <InfoWindow isOpen={infoOpen} onClose={handleInfoClose} />}
            {addressOpen && <AddressWindow isOpen={addressOpen} onClose={handleAddressClose} />}
            {cartOpen && <Cart  onClose={() => setCartOpen(false)} />}
          </div>
        </header>
        {menuOpen && (
          <div className="categoryes">
            {pages.map((category) => (
              <Link
                key={category.name}
                to={category.url}
                className={`category-link ${category.name === 'Pizza' ? 'pizza-category' : ''}`}
                onClick={category.name === 'Pizza' ? handleMenuClick : undefined}
              >
                <img src={process.env.PUBLIC_URL + category.image} alt={category.name} className="category-image" />
                {category.name}
              </Link>
            ))}
          </div>
        )}
        <main>
        <Routes>
            <Route path="/" element={<HomePage row1Categories={row1Pizzas} row2Categories={row2Pizzas} />} />
            <Route path="/pizza-sets" element={<PizzaSet />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/snacks" element={<Snack />} />
            <Route path="/cart" element={<Cart  onClose={() => setCartOpen(false)} />} />
            <Route path="/pizza" element={<Pizza pizzas={pizzas} onPizzaClick={handlePizzaClick} /*onAddToCart={handleAddToCart}*/ />} />
            <Route path="/:pizzaId" element={<PizzaDetails onPizzaClick={handlePizzaClick}  />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/secret" element={<Secret />} />
        </Routes>
        </main>
        {categoryItemOpen && (
        <PizzaDetails
          isOpen={categoryItemOpen}
          pizza={selectedPizza}
          onClose={() => setCategoryItemOpen(false)}
          /*addToCart={handleAddToCart}*/
        />
      )}
      {selectedPizza && (
      <PizzaDetails
       isOpen={true}
       pizza={selectedPizza}
       onClose={() => setSelectedPizza(null)}
       onPizzaClick={handlePizzaClick}
  />
)}
        <footer>
          <div className="social-icons">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '2rem', color: 'black' }} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2rem', color: 'black' }} />
            </a>
          </div>
          {discountOpen && <DiscountWindow isOpen={discountOpen} onClose={handleDiscountClose} />}
          {certificateOpen && <CertificateWindow isOpen={certificateOpen} onClose={handleCertificateClose} />}
          <div className="footer-links">
          <span onClick={handleDiscountClick} > Discount</span>
            <span onClick={handleInfoClick}> Delivery</span>
            <span onClick={handleAddressClick}> Address</span>
            <span onClick={handleCertificateClick} >Certificate</span>
          </div>
          
        </footer>
      </div>
    </Router>
  );
};

export default App;
