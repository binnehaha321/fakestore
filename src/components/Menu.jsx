import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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
                <div>
                    <Link to="/cart" className="setting-link">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>

                    <Link to="/setting/profile" className="setting-link">
                        <FontAwesomeIcon icon={faGear} />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
