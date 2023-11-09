// Checkout.js

import React from 'react';
import { Form, Input, Table, Button } from 'antd';
import "../css/checkout.css"

const Checkout = () => {
    // Fetch the cart items from Redux store
    const cart = JSON.parse(localStorage.getItem("cart"));
    const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <h2>Fill in your details:</h2>

                    <Form layout="vertical" style={{ display: 'grid', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <Form.Item label="First Name">
                                <Input autoComplete="off" placeholder='First name' />
                            </Form.Item>
                            <Form.Item label="Last Name">
                                <Input autoComplete="off" placeholder='Last name' />
                            </Form.Item>

                        </div>
                        <Form.Item label="Email">
                            <Input autoComplete="off" type="email" placeholder='Email' />
                        </Form.Item>
                        <Form.Item label="Address">
                            <Input autoComplete="off" placeholder='Address' />
                        </Form.Item>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <Form.Item label="City">
                                <Input autoComplete="off" placeholder='City' />
                            </Form.Item>
                            <Form.Item label="State">
                                <Input autoComplete="off" placeholder='State' />
                            </Form.Item>
                            <Form.Item label="Zipcode">
                                <Input autoComplete="off" placeholder='Zipcode' />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Your Cart:</h2>
                    <Table
                        dataSource={cart}
                        columns={[
                            {
                                title: 'Product',
                                dataIndex: 'title',
                                key: 'title',
                            },
                            {
                                title: 'Price',
                                dataIndex: 'price',
                                key: 'price',
                                render: (price) => `$${price}`,
                            },
                            {
                                title: 'Quantity',
                                dataIndex: 'quantity',
                                key: 'quantity',
                            },
                            {
                                title: 'Total',
                                key: 'total',
                                render: (text, record) => `$${record.price * record.quantity}`,
                            },
                        ]}
                    />
                    <div style={{ textAlign: "center" }}>
                        <strong>Grand Total: ${grandTotal}</strong>
                    </div>
                </div>
            </div>
            <Button type='primary'>Place Order</Button>

        </>
    );
};

export default Checkout;
