import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import { addProduct, addProductFailed, addProductSuccess } from '../store/productManagement/productManagement.slice';
import request from '../axios';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
export default function ProductList({ data }) {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const dispatch = useDispatch();
    let originalRecord = {};

    const handleDelete = async (key) => {
        try {
            const response = await request.get(`/products/${key}`, 'delete')
            if (response.status === 200) {
                console.log(response.status)
                const newData = data.filter((item) => item.key !== key);
                localStorage.setItem("products", JSON.stringify(newData));
                dispatch(addProduct(newData));
            }
        }
        catch (err) {
            dispatch(addProductFailed(err));
        }
        finally {
            dispatch(addProductSuccess());
        }
    };

    const edit = (record) => {
        form.setFieldsValue({
            image: '',
            title: '',
            price: '',
            category: '',
            ...record,
        });
        originalRecord = { ...record };
        setEditingKey(record.key);
        console.log(originalRecord)
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            dispatch(addProduct());
            const response = await request.get(`./products/${key}`, "put");
            if (response.status === 200) {
                const row = await form.validateFields();

                const newData = [...data];
                console.log(newData)
                const index = newData.findIndex((item) => key === item.id);

                const item = newData[index];

                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                dispatch(addProductSuccess(newData));
                localStorage.setItem('products', JSON.stringify(newData));
                setEditingKey('');
            }

        } catch (err) {
            dispatch(addProductFailed(err));
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            editable: true,
            render: (imageUrl) => <img src={imageUrl} alt="Product" style={{ width: '50px' }} />,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            editable: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            editable: true,
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        {JSON.stringify(record) === JSON.stringify(originalRecord) ?
                            <Typography.Link onClick={cancel}> Cancel </Typography.Link>
                            :
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>}
                    </span>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>

                        <Popconfirm style={{ marginLeft: 8 }} title="Sure to remove?" onConfirm={() => handleDelete(record.key)}>
                            <a>Remove</a>
                        </Popconfirm>
                    </div>

                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}
