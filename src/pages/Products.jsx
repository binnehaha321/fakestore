import React, { useState } from 'react';
import axios from 'axios';
import "../css/products.css";
import "../css/header_menu.css"
import Header from '../components/Home/Menu';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handleFilterClick = () => {
        setIsLoading(true);

        axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Header></Header>
            <div>
                <h1>Products Page</h1>
                <label>
                    Show:
                    <input
                        type="text"
                        value={limit}
                        onChange={handleLimitChange}
                        placeholder="Enter the number of products"
                    />
                    <button onClick={handleFilterClick}>Filter</button>
                </label>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-item">
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductsPage;
