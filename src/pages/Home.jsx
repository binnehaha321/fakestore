import React, { useEffect } from 'react'
import request from '../axios';
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '../store/home/home.action';
export default function Home() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.home);

    const fetchProductWithCategory = async (category) => {
        // if local storage have data
        let productsFromLocalStorage = localStorage.getItem("products") !== null;
        if (productsFromLocalStorage) {
            let productsWithCategory = JSON.parse(localStorage.getItem("products"));
            console.log(productsWithCategory);
            productsWithCategory = productsWithCategory.filter((product) => product.category === category)
            return productsWithCategory;
        }
        else {
            if (products.length > 0) {
                console.log(products);
                return products;
            }
            else {
                return await request.get(`/products/category/${category}`)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                        throw error;
                    });
            }
        }
    }

    useEffect(() => {
        // async function getAllCategories() {
        //     dispatch(loadProduct());
        //     try {
        //         const { data } = await request.get("/products/categories");
        //         const length = data.length;
        //         setCategories(data);
        //         let categoryProductData = [];
        //         for (let i = 0; i < length; i++) {
        //             const productWithCategory = await fetchProductWithCategory(data[i]);
        //             categoryProductData = categoryProductData.concat(productWithCategory);

        //         }
        //         dispatch(loadProductSuccess(categoryProductData));
        //         console.log(categoryProductData);
        //     }
        //     catch (error) {
        //         dispatch(loadProductFailed(error));
        //         console.log(error);
        //     }
        // }
        // getAllCategories();

    }, [])

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    return (
        <>
            <h1 style={{ display: "flex", width: '100vw', justifyContent: 'center' }}>Our Products</h1>
            {/* {productList.length ? (
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
            ) : <Spin id='spin'  tip="Loading..." />} */}
            {loading ? <Spin id='spin' size="large" /> : (
                <div className='product-grid'>
                    {products?.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </>

    )
}

