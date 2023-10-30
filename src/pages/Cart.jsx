import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Spin, Button } from 'antd';

import { fetchAllCart } from '../store/cart/cart.action';
import { addProduct, setIsLoading } from '../store/cart/cart.slice';

import '../css/cart.css';


export default function Cart() {
    const { user } = useSelector((state) => state.auth);
    const { products, loading } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsLoading(true));
            try {
                const cartData = await fetchAllCart(user);
                dispatch(addProduct(cartData));
            } catch (error) {

            } finally {
                dispatch(setIsLoading(false));
            }
        };
        fetchData();
    }, [dispatch, user]);


    return (
        <div className='container'>
            <div>
                left side bar
            </div>

            {loading ? (
                <Spin id='spin' size="large" tip="Loading..." />
            ) : (
                products.length > 0 ?
                    (
                        <div>
                            <h2>Your Cart</h2>
                            <div className="product-grid">
                                {products.map((product) => (
                                    <div key={product.title} className="product-item">
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                        <p>${product.price}</p>
                                        <p>quantity: {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <div style={{ margin: '0 auto', marginTop: '20%' }}>
                        <p>Login to checkout your cart</p>
                        <Link to="/login">
                            <Button type="primary">Login</Button>
                        </Link>
                    </div>
            )}
        </div>
    )
}
