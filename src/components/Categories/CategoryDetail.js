import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import Notiflix from 'notiflix';

const CategoryDetail = () => {
    const { id } = useParams();

    useEffect(() => {
            fetch(`https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/products/${id}`, {
                method: 'GET',
                headers: {'Authorization': 'Bearer 463|nJ4GDW189oFGZl3V3zeRFiTiY27GRND8eC8jJieW736cad7e'}
            })
            .then((res) => res.json())
            .then((resp) => {
                // console.log(resp.data);
                setProduct(resp.data);
            })
            .catch((error) => {
                Notiflix.Notify.failure(error.message);
            });
        }, []);

    console.log(id)
    return (
      <div>
        <h1>Usuário ID: {id}</h1>
      </div>
    );
}
export default CategoryDetail;