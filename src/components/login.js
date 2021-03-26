import './loginForm.css';
import {useState} from 'react';
import {getUserByUsername} from '../api/userApi';
import {Redirect} from "react-router-dom";
import FBButton from './FBButton';
import dotenv from 'dotenv';
dotenv.config();


function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [redirection, setRedirection] = useState(null);

    const handleSubmit= (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('username',usernameInput);
        form.append('password',passwordInput);
        getUserByUsername(process.env.REACT_APP_BASE_URL+"/api/user/login",form)
        .then(res => res.json()
        .then(data => setRedirection(data.url)));
    }


    const usernameInputChange = (e) => {
        setUsernameInput(e.target.value)
    }

    const passwordInputChange = (e) => {
        setPasswordInput(e.target.value)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form--title">Login</h2>
            <input className="form--input" id="email" name="email" type="text" placeholder="Enter your username ..." onChange={usernameInputChange} onBlur={usernameInputChange} value={usernameInput}></input>
            <input id="password" className="form--input" name="password" type="password" placeholder="Enter your password ..." onChange={passwordInputChange} onBlur={passwordInputChange} value={passwordInput}></input>       
            <button className="btn btn-success" type="submit">Envoyer</button>
            {redirection ? <Redirect to = {{pathname: redirection}}/> : ''}
            <h2 className="form--separator"><span className="form--separator-text">ou</span></h2>
            <FBButton />
        </form>
    )
}

export default Login;
