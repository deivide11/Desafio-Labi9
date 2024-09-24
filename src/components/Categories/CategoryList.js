import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Notiflix from 'notiflix';

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

    const RemoveCat = (id) => {
        if (window.confirm('Você deseja excluir essa Categoria?')) {
            fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
                },
            })
            .then(() => {
                Notiflix.Notify.success("Categoria excluída com sucesso!");
                window.location.reload();
                // setCategory(category.filter(cat => cat.id !== id));
            })
            .catch((error) => {
                console.log(error);
                Notiflix.Notify.failure("Erro ao excluir:", error.message);
            });
        }
    };

    return (
        <>
            <Sidebar />
            <div className='mae-list'>
                <div className='c-list'>
                    <div>
                        <h2>Lista de Categorias</h2>
                    </div>
                    <Link to="/category/create">Adicionar Categoria</Link>
                </div>
                <div className='name'>
                    <h3>ID</h3>
                    <h3>Categorias</h3>
                    <h3>Ações</h3>
                </div>
                {category &&
                    category.map(cat => (
                        <div className="item" key={cat.id}>
                            <div>
                                <h2>{cat.id}</h2>
                            </div>
                            <div>
                                <h2 className='name-cat'>{cat.name}</h2>
                            </div>
                            <div>
                                <div>
                                    <button className="edit btn-cursor">Editar</button>
                                    <Link onClick={() => RemoveCat(cat.id)} className="delete btn-cursor">Excluir</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default CategoryList;
