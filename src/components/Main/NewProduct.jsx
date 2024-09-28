import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

const NewProduts = () => {

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
            Notiflix.Notify.failure("Erro ao carregar categorias: " + error.message);
        });
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
            },
            body:JSON.stringify({name, price, description, category_id: catId})
        }).then(res => res.json())
        .then(() => {
            Notiflix.Notify.success("Novo Produto Cadastrado!")
            navigate('/main');
        })
        .catch((error) => {
            console.log(error)
            Notiflix.Notify.failure("Error:", error.message);
        });
    };

    return (
        <div>
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

                <button type="submit"> Cadastrar</button>
                <Link to="/main">Voltar</Link>
            </form>
        </div>
    )
}

export default NewProduts;
