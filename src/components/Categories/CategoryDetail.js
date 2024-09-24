import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

const CategoryDetail = () => {
    const {id} = useParams();

    const[item, setItem] = useState(null);

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
            <div>
                <h2>Detalhes</h2>
            </div>
            {item &&
                <div>
                    <h3>Detalhe do item: <b>{item.name}</b> ({item.id}) </h3>
                    <h5>Descrição: {item.description}</h5>
                    <h5>Categoria: {item.category.name}</h5>
                    <h5>Preço: R${item.price}</h5>
                    <Link to={"/main"}>Voltar</Link>
                </div>
                
            }
        </div>
    );
}
export default CategoryDetail;