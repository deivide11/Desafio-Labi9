import iconAdm from '../../assets/fundo2.png';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className='c-header'>
                <div className='header'>
                    <div className='name-header'>
                        <h1 className='text-header'>
                            Admin Painel
                        </h1>
                    </div>
                    <div className='c-adm'>
                        <p className='user-name'>
                            Deivide Henrique
                        </p>

                        <div className='img-user'>
                            <img src={iconAdm} className="iconAdm" alt="Icon Adm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;