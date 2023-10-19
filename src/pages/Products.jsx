import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setProducts } from '../store/product/product.slice';


import "../css/products.css";
import "../css/header_menu.css"


function ProductsPage() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.products)
    let productFromManagement = useSelector((state) => state.productsManagement.products)

    const [limit, setLimit] = useState(10);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handleFilterClick = async () => {
        dispatch(setIsLoading(true));
        try {
            productFromManagement = productFromManagement.slice(0, limit);
            dispatch(setProducts(productFromManagement));
        } catch (error) {
            console.error('Error handling products:', error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const { products } = useSelector((state) => state.products)

    return (
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
                        <div key={product.title} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
