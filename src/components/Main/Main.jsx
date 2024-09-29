import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Add from '../../assets/add.svg';


const Main = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e' }
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
        if (window.confirm('Você deseja excluir esse produto?')) {
            fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
                },
            })
            .then(() => {
                window.location.reload();
                Notiflix.Notify.success("Excluído com Sucesso!");
            })
            .catch((error) => {
                console.log(error);
                Notiflix.Notify.failure("Erro:", error.message);
            });
        }
    };

    return (
        <>
            <Sidebar />
            <Header />
            <div className="max-w-full h-full">
                <div className="c-produts flex px-20 h-[90vh] items-center justify-center">
                    <div className="flex w-[800px] overflow-auto flex-col whitespace-nowrap">
                        <div className="flex bg-white p-4 rounded-xl overflow-auto items-center justify-between shadow-md">
                            <h3 className="text-[23px] mr-4">Lista de Produtos</h3>
                            <div>
                                <input className="px-5 py-2 border border-gray-300 rounded-xl" placeholder="Buscar produto"></input>
                            </div>
                            <div>
                                <Link to="/product/create" className="">
                                    <img src={Add} className="w-[40px]" alt="Add" />
                                </Link>
                            </div>
                        </div>
                        <div className="core my-5 overflow-auto h-[400px]">
                            <div className="sticky top-0 grid justify-items-center grid-center grid-cols-[9%,34%,13%,44%] justify-center bg-white items-center my-4 p-4 rounded-xl min-w-[630px] shadow-md">
                                <h3>ID</h3>
                                <h3>Produto</h3>
                                <h3>Preço</h3>
                                <h3>Ações</h3>
                            </div>
                            {product && product.map(pro => (
                                <div className="grid justify-items-center grid-center grid-cols-[9%,34%,13%,44%] justify-center bg-white items-center my-4 p-4 rounded-xl min-w-[630px] shadow-md" key={pro.id}>
                                    <div>
                                        <h2>{pro.id}</h2>
                                    </div>
                                    <div>
                                        <h2>{pro.name}</h2>
                                    </div>
                                    <div>
                                        <h2>R${pro.price}</h2>
                                    </div>
                                    <div className="flex gap-4 justify-center">
                                        <Link to={`/products/edit/${pro.id}`} className="edit btn-cursor px-4 py-2 bg-yellow-400 text-black rounded-xl">Editar</Link>
                                        <button onClick={() => Remove(pro.id)} className="delete btn-cursor px-4 py-2 bg-red-600 text-white rounded-xl">Excluir</button>
                                        <Link to={`/products/detail/${pro.id}`} className="detail btn-cursor px-4 py-2 bg-blue-600 text-white rounded-xl">Detalhes</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
