import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className='c-list'>
            <div>
                <h2>Menu</h2>
                <Link to={"/main"}> Lista de Produtos</Link>
                <Link to="/category"> Categorias </Link>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;