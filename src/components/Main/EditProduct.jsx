import Notiflix from 'notiflix';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import iconExit from '../../assets/bx-x.svg';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';


const EditProduct = () => {
    const {id} = useParams();

    const[editId, setEditId] = useState("");
    const[name, setName] = useState("");
    const[price, setPrice] = useState(0);
    const[description, setDescription] = useState("");
    const[catId, setCatId] = useState("");
    const[categories, setCategories] = useState([]);
    
    const navigate = useNavigate();    

    useEffect(() => {
        fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
        })
        .then((res) => res.json())
        .then((resp) => {
            if (resp && resp.data) {
                setEditId(resp.data.id);
                setName(resp.data.name);
                setPrice(resp.data.price);
                setDescription(resp.data.description);
                setCatId(resp.data.category_id);
            } else {
                Notiflix.Notify.failure("Produto não encontrado");
                navigate('/main');
            }
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message);
        });
    }, [id, navigate]);



    useEffect(() => {
        fetch("https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/categories", {
            method: "GET",
            headers: {
                "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
            }
        })
        .then(res => res.json())
        .then(data => {
            setCategories(data.data);
        })
        .catch(error => {
            Notiflix.Notify.failure("Erro na categoria: " + error.message);
        });
    }, [id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
            },
            body: JSON.stringify({editId, name, price, description, category_id: catId })
        }).then(res => res.json())
        .then(() => {
            Notiflix.Notify.success("Produto Editado!")
            navigate('/main');
        })
        .catch((error) => {
            console.log(error)
            Notiflix.Notify.failure("Error:", error.message);
        });
    };

    return (
        <div>
            <Sidebar/>
            <Header/>
                <div className="c-list-prod">
                    <form onSubmit={handleSubmit} className="m-edit">
                        <div className="h-list">
                            <h1 className="name-list"> Editar Produto </h1>
                            <div className="edit-exit">
                                <button type="submit" className="b-edit"> Editar </button>
                                <Link to="/main"> <img src={iconExit} className="iconExit im" alt="Exit" /> </Link>
                            </div>
                        </div>


                        <div className="form-edit">
                            <div className="c-label">
                                <div className="label-edit">
                                    <label className="n-label"> Produto </label>
                                    <input required value={name} className="input-edit" onChange={e => setName(e.target.value)}></input>
                                </div>
                                    
                                <div className="label-edit">
                                    <label className="n-label"> Descrição </label>
                                    <input required value={description} className="input-edit" onChange={e => setDescription(e.target.value)}></input>
                                </div>

                                <div className="label-edit">
                                    <label className="n-label"> Categoria </label>
                                    <select className="input-edit" required value={catId} onChange={e => setCatId(e.target.value)}>
                                        <option value="">Selecione uma Categoria</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}> 
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="label-edit">
                                    <label className="n-label"> Preço </label>
                                    <input required type='number' value={price} className="input-edit" onChange={e => setPrice(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default EditProduct;
