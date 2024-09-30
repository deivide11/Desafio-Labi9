import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Responsive.css';
import iconWave from '../../assets/icon-wave.png';
import box from '../../assets/box.svg';
import categoria from '../../assets/category.svg';
import Notiflix from 'notiflix';
import exit from '../../assets/exit.svg';

const Sidebar = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        let username = localStorage.getItem('username');
        if(username === '' || username === null){
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
        navigate('/');
        Notiflix.Notify.success('Você saiu com sucesso!');
    };
    
    

  return (
    <div className="sidebar fixed w-[50px] h-full bg-white rounded-lg shadow-lg ">
            <div className="c-side flex flex-col items-center h-full">
                <div className="c-icons flex flex-col justify-between h-full items-center py-4">
                    <div className="logo-wave">
                        <img src={iconWave} className="img-wave w-8" alt="Logo Wave Abstract" />
                    </div>
                    <div className="lists gap-5 flex flex-col">
                        <div>
                            <Link to="/main" className="list-prod flex justify-center items-center">
                                <img src={box} className="img-box w-8" alt="Icon Box" />
                            </Link>
                        </div>
                        <div>
                            <Link to="/category" className="categoria flex justify-center items-center">
                                <img src={categoria} className="img-category w-8" alt="Icon Category" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link onClick={handleLogout} className="flex justify-center items-center">
                            <img src={exit} className="img-exit w-8" alt="Icon Exit" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Sidebar;