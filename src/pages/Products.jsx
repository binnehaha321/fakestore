import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Form, Input, Button } from 'antd';
import { Spin } from 'antd';

import { setIsLoading } from '../store/product/product.slice';
import { fetchProducts } from '../store/product/product.action';
import "../css/products.css";
import "../css/header_menu.css"


const { Option } = Select;
const categories = [
    "electronics",
    "jewelry",
    "men's clothing",
    "women's clothing"
];


function FilterByCategory({ handleCategoryChange }) {
    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={handleCategoryChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {categories.map(category => (
                <Option key={category} value={category}>
                    {category}
                </Option>
            ))}
        </Select>
    );
}

function ProductsPage() {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.products)
    let productFromManagement = useSelector((state) => state.productsManagement.products)
    let [products, setProducts] = useState([]);
    let [category, setCategory] = useState('');

    const [limit, setLimit] = useState(10);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    function filterProduct(products, category) {
        let filtered = products.filter(product => product.category === category);
        filtered = filtered.slice(0, limit);
        setProducts(filtered);
    }

    const handleFilterClick = async () => {
        console.log("run")
        dispatch(setIsLoading(true));
        try {
            if (productFromManagement.length > 0) {
                console.log(productFromManagement);
                filterProduct(productFromManagement, category);
            }
            else {
                let productFromAPI = await fetchProducts();
                console.log(productFromAPI)
                filterProduct(productFromAPI, category);
            }
        } catch (error) {
            console.error('Error handling products:', error);
        } finally {
            dispatch(setIsLoading(false));
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
                        placeholder="Number of products"
                        onChange={handleLimitChange}
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
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default ProductsPage;
