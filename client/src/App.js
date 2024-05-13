import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPhone, faShoppingCart, faUser, faTruck } from '@fortawesome/free-solid-svg-icons';
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
import { AuthContext } from './providers/Auth';
import Dashboard from './pages/Dashboard';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import LogoutButton from './pages/LogoutButton';
import UserDashboard from './layouts/UserDashboardLayout';
import OrderHistory from './OrderHistory';
import OrderDetails from './OrderDetails';
import Settings from './Settings';
import OrderPage from './OrderPage';

const useProfile = () => {
    return React.useContext(AuthContext);
};

const App = () => {
    const { profile } = useProfile();
    const { id: userId, first_name: userName } = profile;
    const userIsLogged = parseInt(userId) > 0;
    const [infoOpen, setInfoOpen] = useState(false);
    const [addressOpen, setAddressOpen] = useState(false);
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
                    sessionStorage.setItem('cartId', response.data.id);
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
                <header>
                    <div className="header-left">
                        <span>
                            <FontAwesomeIcon icon={faClock} /> 10:00-22:50
                        </span>
                        <span>
                          <a href="tel:+380457954254" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <FontAwesomeIcon icon={faPhone} /> +380457954254
                          </a>
                        </span>
                        <span onClick={handleInfoClick} className="info-icon">
                            <FontAwesomeIcon icon={faTruck} /> Інформація
                        </span>
                    </div>
                    <div className="header-right">
                        <Link to="/cart" className="link-style">
                            <FontAwesomeIcon icon={faShoppingCart} /> Кошик
                        </Link>
                        {userIsLogged ? (
                            <>
                                <Link to="/dashboard" className="link-style">
                                    <FontAwesomeIcon icon={faUser} /> Привіт, {userName}
                                </Link>
                                <LogoutButton />
                            </>
                        ) : (
                            <Link to="/login" className="link-style">
                                <FontAwesomeIcon icon={faUser} /> Увійти
                            </Link>
                        )}
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage row1Categories={row1Pizzas} row2Categories={row2Pizzas} />} />
                        <Route path="/pizza-sets" element={<PizzaSet />} />
                        <Route path="/drinks" element={<Drinks />} />
                        <Route path="/snacks" element={<Snack />} />
                        <Route path="/cart" element={<Cart onClose={() => setCartOpen(false)} />} />
                        <Route path="/pizza" element={<Pizza pizzas={pizzas} onPizzaClick={handlePizzaClick} />} />
                        <Route path="/:pizzaId" element={<PizzaDetails onPizzaClick={handlePizzaClick} />} />
                        <Route path="/registration" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<UserDashboard><Dashboard profile={profile} /></UserDashboard>} />
                        <Route path="/dashboard/orders/:orderId" element={<UserDashboard><OrderDetails /></UserDashboard>} />
                        <Route path="/dashboard/orders" element={<UserDashboard><OrderHistory profile={profile} /></UserDashboard>} />
                        <Route path="/dashboard/settings" element={<UserDashboard><Settings profile={profile} /></UserDashboard>} />
                        <Route path="/order" element={<OrderPage />} />
                    </Routes>
                </main>

                {categoryItemOpen && (
                    <PizzaDetails
                        isOpen={categoryItemOpen}
                        pizza={selectedPizza}
                        onClose={() => setCategoryItemOpen(false)}
                    />
                )}
                {selectedPizza && (
                    <PizzaDetails
                        isOpen={true}
                        pizza={selectedPizza}
                        onClose={() => setSelectedPizza(null)}
                    />
                )}
                <footer>
                  <section className="place-pizza-logo">
                    <Link to="/" className="place-pizza-logo-link">
                      <h2 className="place-pizza-logo-text">PIZZA PLACE</h2>
                    </Link>
                  </section>
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
                        <span onClick={handleDiscountClick}>Знижки</span>
                        <span onClick={handleCertificateClick}>Сертифікати</span>
                        <span onClick={handleAddressClick}>Адреса</span>
                        
                    </div>
                </footer>
                {infoOpen && <InfoWindow isOpen={infoOpen} onClose={handleInfoClose} />}
                {addressOpen && <AddressWindow isOpen={addressOpen} onClose={handleAddressClose} />}
            </div>
            <ToastContainer />
        </Router>
    );
};

export default App;
