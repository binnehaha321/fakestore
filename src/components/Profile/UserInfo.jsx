import React from 'react'
import { Descriptions } from 'antd'
import { useSelector } from 'react-redux'

export default function UserInfo() {
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="First Name">{user.name.firstname}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{user.name.lastname}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Address">{user.addressLine}</Descriptions.Item>
                <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                <Descriptions.Item label="Zip Code">{user.address.zipcode}</Descriptions.Item>
                <Descriptions.Item label="Latitude">{user.address.geolocation.lat}</Descriptions.Item>
                <Descriptions.Item label="Longitude">{user.address.geolocation.long}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
