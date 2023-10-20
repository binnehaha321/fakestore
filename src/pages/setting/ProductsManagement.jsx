import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, addProductSuccess } from '../../store/productManagement/productManagement.slice';
import ProductList from '../../components/ProductList';
import { insertProductsToLocalStorage } from '../../store/productManagement/productManagement.action';

const ProductsManagement = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productsManagement);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(addProduct())
            try {
                const products = localStorage.getItem('products');
                if (products) {
                    const parsedData = JSON.parse(products);
                    dispatch(addProductSuccess(parsedData));
                }
                else {
                    await insertProductsToLocalStorage();
                    const products = localStorage.getItem('products');
                    const parsedData = JSON.parse(products);
                    dispatch(addProduct(parsedData));
                }
            } catch (error) {
                console.error('Error handling data:', error);
            }
        };

        fetchData();
    }, [dispatch]);
    
    return (
        <>
            <ProductList data={products} />
        </>
    );
};

export default ProductsManagement;
