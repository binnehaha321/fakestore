import React, { useEffect } from 'react'
import request from '../axios';
import { useState } from 'react';
import { Spin } from 'antd';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
export default function Home() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchProductWithCategory = async (category) => {
        return await request.get(`/products/category/${category}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                throw error;
            });
    }

    useEffect(() => {
        async function getAllCategories() {
            const { data } = await request.get("/products/categories");
            const length = data.length;
            setCategories(data);
            let categoryProductData = [];
            for (let i = 0; i < length; i++) {
                const productWithCategory = await fetchProductWithCategory(data[i]);
                categoryProductData = categoryProductData.concat(productWithCategory);

            }
            setProducts(categoryProductData);
            console.log(categoryProductData);
        }
        getAllCategories();

    }, [])

    return (
        <>
            <h1 style={{ display: "flex", width: '100vw', justifyContent: 'center' }}>Our Products</h1>
            <div>
                {products.length > 0 ? (
                    categories.map((category, index) => (
                        <div key={index}>
                            <h2>{category}</h2>
                            <div className="product-grid">
                                {products
                                    .filter((product) => product.category === category).slice(0, 4)
                                    .map((product, productIndex) => (
                                        <div key={productIndex} className="product-item">
                                            <img src={product.image} alt={product.title} />
                                            <p>{product.title}</p>
                                            <p>${product.price}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                ) : <Spin id='spin' size="large" tip="Loading..." />}
            </div>

        </>

    )
}

