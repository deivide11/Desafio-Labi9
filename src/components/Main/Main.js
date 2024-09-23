import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Sidebar from '../Sidebar/Sidebar';
import Notiflix from 'notiflix';

const Main = () => {
    const[product, setProduct] = useState(null);

    useEffect(() => {
        fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products', {
            method: 'GET',
            headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
        })
        .then((res) => res.json())
        .then((resp) => {
            console.log(resp.data);
            setProduct(resp.data);
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message);
        });
    }, []);

    // useEffect(() => {
    //     fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/categories/${id}`, {
    //         method: 'GET',
    //         headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
    //     })
    //     .then((res) => res.json())
    //     .then((resp) => {
    //         console.log(resp.data);
    //         setProduct(resp.data);
    //     })
    //     .catch((error) => {
    //         Notiflix.Notify.failure(error.message);
    //     });
    // }, []);

    return (
        <>
            <Sidebar />            
            <div className='mae-list'>
                <div>
                    <h3>Lista de Produtos</h3>
                    <Link to="/product/create">Novo Produto</Link>
                </div>
                <div className='name'>
                    <h3>ID</h3>
                    <h3>Produto</h3>
                    <h3>Descrição</h3>
                    <h3>Categorias</h3>
                    <h3>Preço</h3>
                    <h3>Ações</h3>
                </div>
                {product &&
                    product.map(pro => (
                        <div className="item" key={pro.id}>
                            <div>
                                <h2> {pro.id} </h2>
                            </div>
                            <div>
                                <h2> {pro.name} </h2>
                            </div>
                            <div>
                                <h2>R${pro.price} </h2>
                            </div>
                            <div>
                                <div>
                                    <button className="edit btn-cursor">Editar</button>
                                    <button className="delete btn-cursor">Excluir</button>
                                    <Link to={"/products/detail/" + pro.id} >Detalhes</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default Main;