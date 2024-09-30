import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { FaRegEdit, FaInfoCircle, FaRegTrashAlt } from 'react-icons/fa';
import { CgFileAdd } from "react-icons/cg";


const Main = () => {
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }                    
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
        const token = localStorage.getItem('token');
        if (!token) {
            Notiflix.Notify.failure('N~ao deu certo');
            return;
        }
        if (window.confirm('Você deseja excluir esse produto?')) {
            fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
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
                <div className="c-products flex px-20 h-[90vh] items-center justify-center">
                    <div className="flex w-[800px] overflow-auto flex-col whitespace-nowrap">
                        <div className="flex bg-white p-4 rounded-xl overflow-auto items-center justify-between shadow-md">
                            <h3 className="text-[23px] mr-4">Lista de Produtos</h3>
                            <div>
                                <input className="px-5 py-2 border border-gray-300 mr-4 rounded-xl" placeholder="Buscar produto"></input>
                            </div>
                            <div>
                                <Link to="/product/create" className="">
                                    <CgFileAdd className="hover:text-blue-900 w-[40px] h-[40px]" /> 
                                </Link>
                            </div>
                        </div>
                        <div className="core my-5 overflow-auto h-[400px]">
                            <div className="sticky top-0 grid justify-items-center grid-center grid-cols-[9%,44%,13%,34%] justify-center bg-white items-center my-4 p-4 rounded-xl min-w-[630px] shadow-md">
                                <h3>ID</h3>
                                <h3>Produto</h3>
                                <h3>Preço</h3>
                                <h3>Ações</h3>
                            </div>
                            {product && product.length > 0 ? (
                                product.map(pro => (
                                <div className="grid justify-items-center grid-center grid-cols-[9%,44%,13%,34%] justify-center bg-white items-center my-4 p-4 rounded-xl min-w-[630px] shadow-md" key={pro.id}>
                                    <div>
                                        <h2>{pro.id}</h2>
                                    </div>
                                    <div>
                                        <h2>{pro.name}</h2>
                                    </div>
                                    <div>
                                        <h2>R${pro.price}</h2>
                                    </div>
                                    <div className="flex gap-8 justify-center items-center">
                                        <Link to={`/products/edit/${pro.id}`} className="">
                                            <FaRegEdit className='hover:text-yellow-400 w-[30px] h-[30px]'/>
                                        </Link>
                                        <button onClick={() => Remove(pro.id)} className="">
                                            <FaRegTrashAlt className='hover:text-red-700 w-[28px] h-[28px]'/>
                                        </button>
                                        <Link to={`/products/detail/${pro.id}`} className="">
                                            <FaInfoCircle className='hover:text-blue-500 w-[30px] h-[30px]' />
                                        </Link>
                                    </div>
                                </div>
                                ))
                            ):(
                                <div className='w-full h-[50%] text-gray-400 font-bold flex items-center justify-center'>Nenhum produto encontrado</div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
