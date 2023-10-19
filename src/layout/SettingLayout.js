import React from 'react'
import { Link } from 'react-router-dom';
import "../css/setting_layout.css";
export default function SettingLayout({children}) {
  return (
    <div className='setting-layout'>
        <div className="sidebar">
            <ul className="sidebar-list">
                <li><Link to="/setting/profile">Your Profile</Link></li>
                <li><Link to="/setting/products">Products Management</Link></li>
            </ul>
        </div>
        {children}
    </div>
  )
}
