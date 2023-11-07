import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Spin, Button } from 'antd';

import { fetchAllCart, calculateTotalPrice } from '../store/cart/cart.action';
import { updateProduct, updateProductSuccess, updateProductFailed } from '../store/cart/cart.slice';

import '../css/cart.css';


export default function Cart() {
    const { user } = useSelector((state) => state.auth);
    const { products, loading } = useSelector((state) => state.cart);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartFromLocalStorage = localStorage.getItem("cart") !== null;
                if (cartFromLocalStorage) {
                    dispatch(updateProductSuccess(JSON.parse(localStorage.getItem("cart"))));
                }
                else {
                    await fetchAllCart(user.id);
                    const products = localStorage.getItem('cart');
                    const parsedData = JSON.parse(products);
                    dispatch(updateProductSuccess(parsedData));
                }
            } catch (error) {
                dispatch(updateProductFailed(error));
            }
        };
        fetchData();
    }, [dispatch, user]);

    useEffect(() => {
        // Function to count categories when products change
        const countCategories = () => {
            let categoriesCounted = [];
            for (let i = 0; i < products.length; i++) {
                let categoryName = products[i].category;
                if (!categoriesCounted.includes(categoryName)) {
                    categoriesCounted.push(categoryName);
                }
            }
            setCategories(categoriesCounted);
        };

        countCategories();
    }, [products]);



    const incrementQuantity = (productId) => {
        dispatch(updateProduct());
        try {
            const updatedProducts = products.map((product) => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
            dispatch(updateProductSuccess(updatedProducts));
        }
        catch (err) {
            dispatch(updateProductFailed(err));
        }
    };

    const decrementQuantity = (productId) => {
        dispatch(updateProduct());
        try {
            let toRemove = false;
            let updatedProducts = products.map((product) => {
                if (product.id === productId) {
                    if (product.quantity > 1) {
                        return { ...product, quantity: product.quantity - 1 };
                    }
                    else {
                        toRemove = true;
                    }
                }
                return product;
            });

            if (toRemove === true) {
                updatedProducts = updatedProducts.filter((product) => product.id !== productId);
            }

            dispatch(updateProductSuccess(updatedProducts));
            localStorage.setItem('cart', JSON.stringify(updatedProducts))
        }
        catch (err) {
            dispatch(updateProductFailed(err));
        }
    };

    return (
        <div className='container'>
            <div>
                <div>
                    <h2>Categories Bought</h2>
                    <div className='categories-frame'>
                        {categories.map((category, index) => (
                            <span className='category-item' key={index}>{category} </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Total Price:</h3>
                    <p>${calculateTotalPrice(products)}</p>
                </div>

                <Button type="primary">Checkout</Button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Spin size="large" tip="Loading..." />
                </div>
            ) : products && products.length > 0 ? (
                // Display cart items
                <div>
                    <h2>Your Cart</h2>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-item">
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                                <div className='product-quantity'>
                                    <Button onClick={() => decrementQuantity(product.id)}>-</Button>
                                    <p>Quantity: <span style={{ color: "blue" }}>{product.quantity}</span></p>
                                    <Button onClick={() => incrementQuantity(product.id)}>+</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : user ? (
                // Display "Your cart is empty" message
                <p style={{ margin: '0 auto', marginTop: '20%', fontSize: "30px", color: "red" }}> Your cart is empty</p>
            ) : (
                // Prompt to log in
                <div style={{ margin: '0 auto', marginTop: '20%' }}>
                    <p>Login to checkout your cart</p>
                    <Link to="/login">
                        <Button type="primary">Login</Button>
                    </Link>
                </div>
            )}

        </div>
    )
}
