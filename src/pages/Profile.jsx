// Profile.js
import React from 'react';
import UserInfo from '../components/Profile/UserInfo';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <UserInfo />
            )}
        </div>
    );
};

export default Profile;
