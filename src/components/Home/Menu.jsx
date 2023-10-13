import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header>
            <nav className="header-menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
                <Link to="/profile" className="profile-link">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </nav>
        </header>
    );
}

export default Header;
