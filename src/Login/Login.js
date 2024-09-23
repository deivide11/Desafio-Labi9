import { useState } from 'react';
import Notiflix from 'notiflix';
import './Login.css';
import wave from '../assets/wave abstract.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, UsernameUpdate] = useState('');
    const [password, PasswordUpdate] = useState('');

    const [name, NameUpdate] = useState('');
    const [email, EmailUpdate] = useState('');
    const [passRegister, PassRegisterUpdate] = useState('');
    const [passConfirm, PassConfirmUpdate] = useState('');

    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    const tradeForm = () => {
        setIsLogin(!isLogin);
        UsernameUpdate('');
        PasswordUpdate('');
        NameUpdate('');
        EmailUpdate('');
        PassRegisterUpdate('');
        PassConfirmUpdate('');
    };

    const ProceedLogin = (e) => {
        e.preventDefault();
        if(validateLogin()) {
            fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                    body: JSON.stringify({ email: username, password}),
                }).then((res) => res.json())
                    .then(data => {
                        if(!data.error){
                            Notiflix.Notify.success('Entrou com sucesso!');
                            navigate('/main');
                        } else {
                            Notiflix.Notify.failure('Erro ao logar.');
                        }
                    })
                    .catch(error => console.error('Erro ao logar:', error));
            }
        };

    const ProceedRegister = (e) => {
        e.preventDefault();
        if(validateRegister()) {
            fetch('https://challenge-labi9-4b4c472d5c07.herokuapp.com/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: name, 
                    email: email, 
                    password: passRegister, 
                    password_confirmation: passConfirm
                }),
            }).then((res) => res.json())
                .then(data => {
                    if(!data.error){
                        Notiflix.Notify.success('Usuário registrado com sucesso');
                        setIsLogin(!isLogin);
                    }})
                .catch(error => Notiflix.Notify.failure('Erro ao registrar:', error));
            }};

    const validateLogin = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            Notiflix.Notify.warning('E-mail inválido');
        }
        if (password === '' || password === null) {
            result = false;
            Notiflix.Notify.warning('Senha inválida');
        }
        return result;
    };

    const validateRegister = () => {
        let result = true;
        if (name === '' || name === null) {
            result = false;
            Notiflix.Notify.warning('Usuário inválido');
        }
        if (email === '' || email === null) {
            result = false;
            Notiflix.Notify.warning('E-mail inválido');
        }
        if (passRegister === '' || passRegister === null) {
            result = false;
            Notiflix.Notify.warning('Senha inválido');
        }
        if (passConfirm === '' || passConfirm === null || passRegister !== passConfirm) {
            result = false;
            Notiflix.Notify.warning('Senha não é coerente');
        }
        return result;
    };

    return (
        <div className="body-login">
            <img src={wave} className="wave-abstract" alt="Wave Abstract" />
            <main className="container-login">
                <div className="left-login">
                    <h2>Inovação é o nosso futuro!</h2>
                </div>

                <form onSubmit={isLogin ? ProceedLogin : ProceedRegister} className="right-login">
                    {isLogin ? (
                        <div className='test'>
                            <div className="wave-logo">
                                <h3>Abstract</h3>
                            </div>

                            <div className="card-login">
                                <h1>Bem-vindo(a)</h1>
                                <div className="textfield">
                                    <label htmlFor="email">E-mail </label>
                                    <input value={username} onChange={e => UsernameUpdate(e.target.value)} type="text" name="email" placeholder="Entre com seu e-mail" />
                                </div>
                                <div className="textfield">
                                    <label htmlFor="password">Senha</label>
                                    <input value={password} onChange={e => PasswordUpdate(e.target.value)} type="password" name="password" placeholder="Entre com sua senha" />
                                </div>
                                <button type="submit" className="btn-login">LOGIN</button>
                            </div>
                            <p> Não tem conta? <span className="trade-link" onClick={tradeForm}> Cadastre-se </span></p>
                        </div>
                    ) : (
                        <div className='test'>
                            <div className="wave-logo">
                                <h3>Abstract</h3>
                            </div>
                            
                            <div className='card-login'>
                                <h1>Cadastre-se</h1>
                                <div className="textfield">
                                    <label for="name">Nome de usuário</label>
                                    <input value={name} onChange={e => NameUpdate(e.target.value)} type="text" name="name" placeholder="Digite seu usuário" />
                                </div>
                                <div className="textfield">
                                    <label for="email">E-mail</label>
                                    <input value={email} onChange={e => EmailUpdate(e.target.value)} type="email" name="email" placeholder="Digite seu e-mail" />
                                </div>
                                <div className="textfield">
                                    <label for="password">Senha</label>
                                    <input value={passRegister} onChange={e => PassRegisterUpdate(e.target.value)} type="password" name="passRegister" placeholder="Digite sua senha" />
                                </div>
                                <div className="textfield">
                                    <label for="passConfirm">Confirmar</label>
                                    <input value={passConfirm} onChange={e => PassConfirmUpdate(e.target.value)} type="password" name="passConfirm" placeholder="Confirme sua senha" />
                                </div>
                                <button type="submit" className="btn-login">Cadastrar</button>  
                            </div>
                            <p> Já tem uma conta? <span className="trade-link" onClick={tradeForm}> Faça login </span> </p>
                        </div>
                    )}
                </form>
            </main>
        </div>
    );
};

export default Login;
