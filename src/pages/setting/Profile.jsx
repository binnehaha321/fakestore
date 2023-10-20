// Profile.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import UserInfo from '../../components/UserInfo';
import { logout } from '../../store/auth/auth.actions';
import { capitalizeFirstLetter } from '../../helpers/capitalizeLetter';

const Profile = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    return (
        <>
            <div>
                <h2>{capitalizeFirstLetter([user.username])[0]} Profile</h2>
                {user && (
                    <UserInfo />
                )}
                <Button onClick={() => {
                    dispatch(logout());
                }} style={{ color: "red" }}>logout</Button>
            </div >
        </>
    );
};

export default Profile;
