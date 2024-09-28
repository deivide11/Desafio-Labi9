import Notiflix from 'notiflix';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const EditProduct = () => {
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
        })
        .then((res) => res.json())
        .then((resp) => {
            setEditId(resp.id);
            setName(resp.name);
            setPrice(resp.price);
            setCatId(resp.category_id);
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message);
        });
    }, [id]);

    const[editId, setEditId] = useState("");
    const[name, setName] = useState("");
    const[price, setPrice] = useState(0);
    const[description, setDescription] = useState("");
    const[catId, setCatId] = useState("");
    const[categories, setCategories] = useState([]);
    
    const navigate = useNavigate();

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
            <h1> EDITAR </h1>
            <form onSubmit={handleSubmit}>
                <label> Produto </label>
                <input required value={name} onChange={e => setName(e.target.value)}></input>
                
                <label> Descrição </label>
                <input required value={description} onChange={e => setDescription(e.target.value)}></input>

                <label> Categoria </label>
                <select required value={catId} onChange={e => setCatId(e.target.value)}>
                    <option value="">Selecione uma Categoria</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}> 
                            {cat.name}
                         </option>
                    ))}
                </select>

                <label> Preço </label>
                <input required type='number' value={price} onChange={e => setPrice(e.target.value)}></input>

                <button type="submit"> Editar </button>
                <Link to="/main">Voltar</Link>
            </form>
        </div>
    )
}

export default EditProduct;
