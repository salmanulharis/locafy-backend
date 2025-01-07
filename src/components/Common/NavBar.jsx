import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('locafy-user');

    const handleLogout = () => {
        localStorage.removeItem('locafy-user');
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/shops">Locafy</Link>
            </div>
            <ul className="navbar-links">
                {user && (
                    <>
                    <li><button onClick={handleHome}>Home</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;