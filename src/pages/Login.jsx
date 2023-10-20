// Login.js
import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';

import { loginSuccess } from '../store/auth/auth.slice';
import { login } from '../store/auth/auth.actions';

const Login = () => {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const userToLogin = await login(values.email, values.password)
        dispatch(loginSuccess({...userToLogin}));
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={8}>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <h2>Login</h2>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!',
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
