import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/sidebar.css'; 

function Sidebar({ toggleSidebar, isOpen }) {
    return (
        <div className={isOpen ? 'sidebar open' : 'sidebar closed'}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? '←' : '→'}
            </button>
            <ul className="items">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/menu">Menu</Link>
                </li>
                <li>
                    <Link to="/workers">Funcionários</Link>
                </li>
                <li>
                    <Link to="/orders">Pedidos</Link>
                </li>
                <li>
                    <Link to="/costumers">Clientes</Link>
                </li>
                <li>
                    <Link to="/bookings">Reservas</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
