// Profile.js
import React from 'react';
import { useSelector } from 'react-redux';

import UserInfo from '../components/Profile/UserInfo';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

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
