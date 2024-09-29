import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
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
            <div className="c-products flex px-20 h-[90vh] items-center justify-center">
                <div className='w-[600px]'>
                    <div className='flex bg-white p-4 rounded-xl overflow-auto items-center justify-between'>
                        <h1 className='name-list font-bold text-[23px] mr-4'>Detalhes do Produto</h1>
                        <div>
                            <Link to={"/main"} className='py-3 px-5 bg-gradient-to-r from-[#005f8f] to-[#7d002f] text-white rounded-xl mr-4'>
                                Voltar
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl flex justify-center items-center my-5 shadow-md">
                        <div className="core w-[100%] p-5 flex flex-col cursor-default overflow-auto">
                            {item && (
                                <div>
                                    <div className="mb-4">
                                        <h3 className='n-label text-[18px] font-semibold mb-2 block '>ID</h3>
                                        <div className="w-full border border-gray-400 bg-gray-200 px-4 py-2 rounded-md">{item.id}</div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className='n-label text-[18px] font-semibold mb-2 block'>Produto</h3>
                                        <div className="w-full border border-gray-400 bg-gray-200 px-4 py-2 rounded-md">{item.name}</div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className='n-label text-[18px] font-semibold mb-2 block'>Descrição</h3>
                                        <div className="w-full border border-gray-400 bg-gray-200 px-4 py-2 rounded-md">{item.description}</div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className='n-label text-[18px] font-semibold mb-2 block'>Categoria</h3>
                                        <div className="w-full border border-gray-400 bg-gray-200 px-4 py-2 rounded-md">{item.category.name}</div>
                                    </div>
                                    <div>
                                        <h3 className='n-label text-[18px] font-semibold mb-2 block'>Preço</h3>
                                        <div className="w-full border border-gray-400 bg-gray-200 px-4 py-2 rounded-md">R$ {item.price}</div>
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
