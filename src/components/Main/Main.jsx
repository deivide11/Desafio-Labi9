import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Notiflix from 'notiflix';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Main = () => {
    const[product, setProduct] = useState(null);

    useEffect(() => {
        fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products', {
            method: 'GET',
            headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
        })
        .then((res) => res.json())
        .then((resp) => {   
            setProduct(resp.data);
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message);
        });
    }, []);
    
    const Remove = (id) => {
        if(window.confirm('Você deseja excluir esse produto?')){
                fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
                    method:"DELETE",
                    headers:{
                        "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
                    },
                })
                .then(() => {
                    window.location.reload();
                    Notiflix.Notify.success("Excluido com Sucesso!");
                })
                .catch((error) => {
                    console.log(error)
                    Notiflix.Notify.failure("Error:", error.message);
                });
            };
        }
    

    return (
        <>   
        
        <Sidebar/>
        <Header/>
            <div className='mae-list'>

                <div className='c-list-prod'>
                    <div className='transp'>
                        <div className='h-list'>
                            <h3 className='name-list'>Lista de Produtos</h3>
                            <div>
                                <input  className='search'></input>
                            </div>
                            <div>
                                <Link to="/product/create" className='btn-new'>Novo Produto</Link>
                            </div>
                        </div>

                        <div className='miolo'>
                            <div className='name'>
                                <h3>ID</h3>
                                <h3>Produto</h3>
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
                                        <div className='c-btn'>
                                                <Link to={"/products/edit/" + pro.id} className="edit btn-cursor">Editar</Link>
                                                <Link onClick={() => Remove(pro.id)} className="delete btn-cursor">Excluir</Link>
                                                <Link to={"/products/detail/" + pro.id} className='detail btn-cursor' >Detalhes</Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Main;