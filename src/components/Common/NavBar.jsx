import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/shops">Locafy</Link>

            </div>
            <ul className="navbar-links">
                <li><Link to="/shops">Home</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;