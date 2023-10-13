import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Home/Menu';
import "../css/header_menu.css";
export default function Home() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            <Header></Header>
            Hello {user.username}
            <Link to="/profile">Go to Profile</Link>
        </div>
    )
}
