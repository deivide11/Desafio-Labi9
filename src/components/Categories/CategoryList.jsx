import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notiflix from 'notiflix';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const CategoryList = () => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/categories', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e' }
        })
        .then((res) => res.json())
        .then((resp) => {
            setCategory(resp.data);
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message);
        });
    }, []);

    return (
        <>
            <Sidebar />
            <Header/>
            <div className="c-products flex px-20 h-[90vh] items-center justify-center">
            <div className="w-[600px]">
                <div className="flex bg-white p-4 rounded-xl overflow-auto items-center justify-between shadow-md">
                    <h1 className="font-bold text-[23px] mr-4">
                        Lista de Categorias
                    </h1>
                    <Link to="/category/create" className="btn-new py-3 px-5 bg-gradient-to-r from-[#005f8f] to-[#7d002f] text-white rounded-xl">Nova Categoria</Link>
                </div>
                <div className="core my-5 overflow-auto h-[400px]">
                    <div className="sticky top-0 names grid justify-items-center grid-center grid-cols-[20%,80%] justify-center h-[55px] bg-white items-center my-4 p-4 rounded-xl shadow-md">
                        <h3>ID</h3>
                        <h3>Categoria</h3>
                    </div>
                    {category && category.map(cat => (
                        <div className="grid justify-items-center grid-cols-[20%,80%] justify-center h-[55px] bg-white items-center my-4 p-4 rounded-xl shadow-md" key={cat.id}>
                            <div>
                                <h2>{cat.id}</h2>
                            </div>
                            <div>
                                <h2>{cat.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryList;
