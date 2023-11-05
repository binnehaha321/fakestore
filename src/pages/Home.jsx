import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Spin } from 'antd';

import { getProducts } from "../store/home/home.action"
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading } = useSelector((state) => state.home);
    const [displayCount, setDisplayCount] = useState(8); // Initial number of products to display

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const loadMore = () => {
        setDisplayCount(displayCount + 8);
    };

    // Render products based on the displayCount
    const visibleProducts = products.slice(0, displayCount);

    return (
        <>
            <h1 style={{ display: 'flex', width: '100vw', justifyContent: 'center' }}>Our Products</h1>
            <div className='product-grid'>
                {visibleProducts.map((product) => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.title} />
                        <p style={{ fontStyle: 'italic' }}>{product.category}</p>
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                        <Button onClick={() => navigate(`/products/${product.id}`)}>Buy this</Button>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {loading && <Spin id='spin' size="large" />}
                {displayCount < products.length && !loading && ( // Show "Load More" button if there are more products
                    <Button onClick={loadMore} style={{ marginTop: "5vh" }}>Load More</Button>
                )}
            </div>
        </>
    );
};

export default Home;
