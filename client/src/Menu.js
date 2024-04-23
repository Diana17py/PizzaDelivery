import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    // Використання useLocation для отримання поточного шляху в URL
    const location = useLocation();

    return (
        <nav className="menu-container">
            <ul className="menu-list">
                {/* Додання класу 'active' до відповідного пункту меню */}
                <li className={location.pathname === '/pizza' ? 'active' : ''}>
                    <Link to="/pizza">ПІЦА</Link>
                </li>
                <li className={location.pathname === '/pizza-sets' ? 'active' : ''}>
                    <Link to="/pizza-sets">НАБОРИ</Link>
                </li>
                <li className={location.pathname === '/drinks' ? 'active' : ''}>
                    <Link to="/drinks">НАПОЇ</Link>
                </li>
                <li className={location.pathname === '/snacks' ? 'active' : ''}>
                    <Link to="/snacks">СНЕКИ</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
