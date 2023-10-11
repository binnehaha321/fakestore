import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Home() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            Hello {user.username}
            <Link to="/profile">Go to Profile</Link>
        </div>
    )
}
