import './loginForm.css'
import {useState} from 'react'
import {createUser} from '../api/userApi'

function LoginForm() {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleSubmit= (e) => {
        e.preventDefault()
        createUser('https://test-seven.site/user',{emailInput,passwordInput})
    }

    const emailInputChange = (e) => {
        setEmailInput(e.target.value)
    }

    const passwordInputChange = (e) => {
        setPasswordInput(e.target.value)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form--title">Login</h2>
            <input className="form--input" id="email" name="email" type="email" placeholder="Taper votre email ..." onChange={emailInputChange} value={emailInput}></input>
            <input id="password" className="form--input" name="password" type="password" placeholder="Password ..." onChange={passwordInputChange} value={passwordInput}></input>       
            <button className="btn btn-success" type="submit">Envoyer</button>

        </form>
    )
}

export default LoginForm;
