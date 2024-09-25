import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Notiflix from 'notiflix';
import Sidebar from '../Sidebar/Sidebar';

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
    
    const Remove = (id) => {
        if(window.confirm('Você deseja excluir esse produto?')){
                fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
                    method:"DELETE",
                    headers:{
                        "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
                    },
                })
                .then(() => {
                    Notiflix.Notify.success("Excluido com Sucesso!");
                    window.location.reload();
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
            <div className='mae-list'>
                <div className='c-list-prod'>
                    <div className=''>
                        <div>
                            <h3>Lista de Produtos</h3>
                            <Link to="/product/create">Novo Produto</Link>
                        </div>
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
                                    <div>
                                        <div>
                                            <Link to={"/products/edit/" + pro.id} className="edit btn-cursor">Editar</Link>
                                            <Link onClick={() => Remove(pro.id)} className="delete btn-cursor">Excluir</Link>
                                            <Link to={"/products/detail/" + pro.id} >Detalhes</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Main;