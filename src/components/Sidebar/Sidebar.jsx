import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

import iconWave from '../../assets/icon-wave.png';
import box from '../../assets/box.svg';
import categoria from '../../assets/category.svg';
import exit from '../../assets/exit.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className='c-side'>
            <div className='c-icons'>
                <div className='logo-wave'>
                    <img src={iconWave} className="img-wave im" alt="Logo Wave Abstract" />
                </div>

                <div className='lists'>
                    <div className='c-produto d-categoria'>
                        <Link to="/main" className='list-prod'>
                            <img src={box} className="img-box im" alt="Icon Box" />
                        </Link>
                    </div>
                    <div className='c-categoria d-categoria'>
                        <Link to="/category" className='categoria'>
                            <img src={categoria} className="img-category im" alt="Icon Category" />
                        </Link>
                    </div>
                </div>
                
                <div className=''>
                    <Link to="" className='exit'>
                        <img src={exit} className="img-exit im" alt="Icon Exit" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;