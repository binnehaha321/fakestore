import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import { addProduct, addProductFailed, addProductSuccess } from '../store/productManagement/productManagement.slice';

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

    const handleDelete = (key) => {
        try {
            const newData = data.filter((item) => item.key !== key);
            dispatch(addProduct(newData));
            localStorage.setItem("products", JSON.stringify(newData));
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
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log(row);

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            const item = newData[index];
            console.log("item:", item);

            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            dispatch(addProduct(newData));
            localStorage.setItem('products', JSON.stringify(newData));
            setEditingKey('');

        } catch (err) {
            console.log('Validate Failed:', err);
            dispatch(addProductFailed(err));
        }
        finally {
            dispatch(addProductSuccess());
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
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>

                        <Typography.Link style={{ marginLeft: 8 }} onClick={() => handleDelete(record.key)}>
                            Remove
                        </Typography.Link>
                    </>

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
