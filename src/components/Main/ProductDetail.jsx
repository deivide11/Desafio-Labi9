import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
// import iconExit from '../../assets/bx-x.svg';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const CategoryDetail = () => {
    const {id} = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
        })
        .then((res) => res.json())
        .then((resp) => {
            setItem(resp.data);
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message);
        });
    }, [id]);

    return (
        <div>
            <Sidebar />
            <Header />
            <div className="c-list-prod">
                <div className='m-edit'>
                    <div className='h-list'>
                        <h1 className='name-list'>Detalhes</h1>
                        <div>
                            <Link to={"/main"} className='b-edit'>
                                Voltar
                            </Link>
                        </div>
                    </div>
                    <div className="form-edit">
                        <div className="c-label">
                            {item && (
                                <div>
                                    <div className="label-edit">
                                        <h3 className='n-label'>ID</h3>
                                        <div className="detail-value">{item.id}</div>
                                    </div>
                                    <div className="label-edit">
                                        <h3 className='n-label'>Produto</h3>
                                        <div className="detail-value">{item.name}</div>
                                    </div>
                                    <div className="label-edit">
                                        <h3 className='n-label'>Descrição</h3>
                                        <div className="detail-value">{item.description}</div>
                                    </div>
                                    <div className="label-edit">
                                        <h3 className='n-label'>Categoria</h3>
                                        <div className="detail-value">{item.category.name}</div>
                                    </div>
                                    <div className="label-edit">
                                        <h3 className='n-label'>Preço</h3>
                                        <div className="detail-value">R$ {item.price}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryDetail;
