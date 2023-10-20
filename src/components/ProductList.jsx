import React, { useState } from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import { addProductSuccess } from '../store/productManagement/productManagement.slice';
import { useDispatch } from 'react-redux';

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
        const newData = data.filter((item) => item.key !== key);
        dispatch(addProductSuccess(newData));
        localStorage.setItem("products", JSON.stringify(newData));
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
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setEditingKey('');
            } else {
                newData.push(row);
                dispatch(addProductSuccess(newData));
            }
            localStorage.setItem("products", JSON.stringify(newData));
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
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
