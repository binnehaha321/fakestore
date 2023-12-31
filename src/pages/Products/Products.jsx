import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { Spin } from 'antd';

import { updateProduct, updateProductSuccess, updateProductFailed } from '../../store/product/product.slice';
import { fetchCategoryProduct, fetchProducts, filterProduct } from '../../store/product/product.action';

import { FilterByCategory } from './CategoryFilter';
import "../../css/products.css";
import "../../css/header_menu.css"


function ProductsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading } = useSelector((state) => state.product)
    const [category, setCategory] = useState('all');
    const [limit, setLimit] = useState(4);

    const handleLimitChange = (event) => {
        const limitValue = event.target.value
        if (Number(limitValue) <= 0) {
            setLimit(1)
        } else {
            setLimit(event.target.value);
        }
    };

    const handleFilterClick = async () => {
        const productsFormLocalStorage = localStorage.getItem("products") !== null;
        try {
            if (productsFormLocalStorage) {
                let products = JSON.parse(localStorage.getItem("products"));
                filterProduct(products, category, dispatch, limit);
            }
            else {
                dispatch(updateProduct())
                if (category === 'all') {
                    let productFromAPI = await fetchProducts();
                    let filtered = productFromAPI.slice(0, limit);
                    dispatch(updateProductSuccess(filtered));
                }
                else {
                    let productFromAPI = await fetchCategoryProduct(category);
                    let filtered = productFromAPI.slice(0, limit);
                    dispatch(updateProductSuccess(filtered));
                }
            }
        } catch (error) {
            dispatch(updateProductFailed(error));
        }
    };

    const handleCategoryChange = value => {
        setCategory(value);
    }

    return (
        <div>
            <h1>Products Page</h1>

            <Form layout="inline" onFinish={handleFilterClick}>
                <Form.Item name="limit">
                    <Input
                        type='number'
                        defaultValue={limit}
                        placeholder="Number of products"
                        onChange={handleLimitChange}
                        min={1}
                    />
                </Form.Item>
                <Form.Item name="category">
                    <FilterByCategory handleCategoryChange={handleCategoryChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Apply Filters
                    </Button>
                </Form.Item>
            </Form>

            {loading ? (
                <Spin id='spin' size="large" tip="Loading..." />
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.title} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                            <Button onClick={() => navigate(`/products/${product.id}`)}>Buy this</Button>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default ProductsPage;
