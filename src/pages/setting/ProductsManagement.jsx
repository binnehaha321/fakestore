import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { addProduct, addProductFailed, addProductSuccess } from '../../store/productManagement/productManagement.slice';
import ProductList from '../../components/ProductList';
import { insertProductsToLocalStorage } from '../../store/productManagement/productManagement.action';


const ProductsManagement = () => {
    const dispatch = useDispatch();
    const { loading, products } = useSelector((state) => state.productsManagement);
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(addProduct())
                const products = localStorage.getItem('products');
                if (products !== null) {
                    const parsedData = JSON.parse(products);
                    dispatch(addProductSuccess(parsedData));
                }
                else {
                    await insertProductsToLocalStorage();
                    const products = localStorage.getItem('products');
                    const parsedData = JSON.parse(products);
                    dispatch(addProductSuccess(parsedData));
                }
            } catch (error) {
                dispatch(addProductFailed(error));
            }
        };

        fetchData();
    }, [dispatch]);


    return (
        <>
            {loading ?
                <Spin id='spin' size="large" tip="Loading..." />
                :
                <ProductList data={products} />
            }
        </>
    );
};

export default ProductsManagement;
