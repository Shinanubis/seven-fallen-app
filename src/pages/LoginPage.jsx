import './LoginPage.css';
import {useState} from 'react';
import {useHistory} from 'react-router-dom'
import SocialButton from '../components/SocialButton';
import Separator from '../components/Separator'
import {AiOutlineGooglePlus} from 'react-icons/ai'
import {FaFacebookF} from 'react-icons/fa'
import AuthenticationContext from "../contexts/Context"
import dotenv from 'dotenv';
dotenv.config();


function Login(props) {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const history = useHistory();

    const handleFacebook = () => {
        fetch('https://test-seven.site/auth/facebook',{
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            method : 'GET',
            credentials: 'include',
        })
        .then(res => res.text())
        .then(data => console.log(data))
    }

    const usernameInputChange = (e) => {
        setUsernameInput(e.target.value)
    }

    const passwordInputChange = (e) => {
        setPasswordInput(e.target.value)
    }

    return (
        <AuthenticationContext.Consumer>
            {
                obj => {
                    return (
                        <form className="form" onSubmit={e => obj.setLogin(e,history.push)}>
                            <div className="form--section">
                            <h2 className="form--title">Login</h2>
                            <input className="form--input" id="email" name="email" 
                                   type="text" placeholder="Enter your username ..." 
                                   onChange={usernameInputChange} onBlur={usernameInputChange} 
                                   value={usernameInput}/>
                            <input id="password" className="form--input" name="password" 
                                   type="password" placeholder="Enter your password ..." 
                                   onChange={passwordInputChange} onBlur={passwordInputChange} 
                                   value={passwordInput}/> 
                            </div>      
                            <button className="btn" type="submit">Envoyer</button>
                            <Separator />
                            <ul className="social__icons--list">
                                <li>
                                    <SocialButton bgcolor="#3b5998" onClick={handleFacebook}>
                                        <FaFacebookF/>
                                    </SocialButton>
                                </li>
                                <li>

                                </li>
                            </ul>
                    </form>
                    )
                }
            }
        </AuthenticationContext.Consumer>
    )
}

export default Login;
