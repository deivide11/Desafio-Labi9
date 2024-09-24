import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Notiflix from 'notiflix';

const NewCategory = () => {

    const[name, setName] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/categories", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e"
            },
            body:JSON.stringify({name})
        }).then(res => res.json())
        .then(() => {
            Notiflix.Notify.success("Nova categoria cadastrada!")
            navigate('/category');
        })
        .catch((error) => {
            Notiflix.Notify.failure("Error:", error.message);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Nova categoria </label>
                <input required value={name} onChange={e => setName(e.target.value)}></input>
                <button type="submit"> Cadastrar</button>
                <Link to="/category">Voltar</Link>
            </form>
        </div>
    )
}

export default NewCategory;
