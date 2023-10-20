import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '../axios'


import "../css/products.css";
import "../css/header_menu.css"
import { addProductSuccess } from '../store/productManagement/productManagement.slice';


function ProductsPage() {
    const { products } = useSelector((state) => state.productsManagement)
    const dispatch = useDispatch()
    const [limit, setLimit] = useState(10);
    const [productsFiltered, setProductsFiltered] = useState([])
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handleFilterClick = () => {
        setProductsFiltered(products?.slice(0, limit))
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await request('products')
            localStorage.setItem('products', JSON.stringify(data))
            dispatch(addProductSuccess(data))
        }

        const products = localStorage.getItem('products');
        if (products) {
            const parsedData = JSON.parse(products);
            dispatch(addProductSuccess(parsedData))
        } else {
            fetchProducts()
            
        }
    }, [dispatch])

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
            {false ? (
                <p>Loading...</p>
            ) : (
                <div className="product-grid">
                    {productsFiltered?.map((product) => (
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
