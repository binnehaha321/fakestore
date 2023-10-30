import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { addProduct, setIsLoading } from '../../store/productManagement/productManagement.slice';
import ProductList from '../../components/ProductList';
import { insertProductsToLocalStorage } from '../../store/productManagement/productManagement.action';


const ProductsManagement = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.productsManagement);
    useEffect(() => {
        const fetchData = () => {
            try {
                dispatch(setIsLoading(true));
                const products = localStorage.getItem('products');
                if (products !== null) {
                    const parsedData = JSON.parse(products);
                    dispatch(addProduct(parsedData));
                }
                else {
                    insertProductsToLocalStorage();
                    const products = localStorage.getItem('products');
                    const parsedData = JSON.parse(products);
                    dispatch(addProduct(parsedData));
                }
                dispatch(setIsLoading(false));
            } catch (error) {
                console.error('Error handling data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const { products } = useSelector((state) => state.productsManagement);

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
