import './LoginPage.css';
import {useState} from 'react';
import {Redirect, useHistory} from "react-router-dom";
import FBButton from '../components/FBButton';
import SocialButton from '../components/SocialButton';
import {AiOutlineGooglePlus,AiOutlineApple} from 'react-icons/ai'
import {FiTwitter} from 'react-icons/fi'
import AuthenticationContext from "../contexts/Context"
import dotenv from 'dotenv';
dotenv.config();


function Login(props) {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [redirection, setRedirection] = useState(null);
    const history = useHistory();
    const handleSubmit= (e,uri) => {
        e.preventDefault();
        // const form = new FormData();
        // form.append('username',usernameInput);
        // form.append('password',passwordInput);
        // getUserByUsername(process.env.REACT_APP_BASE_URL+"/api/user/login",form)
        // .then(res => res.json()
        // .then(data => setRedirection(data.url)));
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
                            <h2 className="form--title">Login</h2>
                            <input className="form--input" id="email" name="email" type="text" placeholder="Enter your username ..." onChange={usernameInputChange} onBlur={usernameInputChange} value={usernameInput}></input>
                            <input id="password" className="form--input" name="password" type="password" placeholder="Enter your password ..." onChange={passwordInputChange} onBlur={passwordInputChange} value={passwordInput}></input>       
                            <button className="btn btn__submit" type="submit">Envoyer</button>
                            {redirection ? <Redirect to = {{pathname: redirection}}/> : ''}
                            <h2 className="form--separator"><span className="form--separator-text">ou</span></h2>
                            <ul className="social__icons--list">
                                <li>
                                    <FBButton bgcolor={'#3b5998'}/>
                                </li>
                                <li>
                                    <SocialButton bgcolor={'#C94130'}>
                                        <AiOutlineGooglePlus className="icons google__icon"/>
                                    </SocialButton>
                                </li>
                                <li>
                                    <SocialButton bgcolor={'#050708'}>
                                        <AiOutlineApple className="icons apple__icon"/>
                                    </SocialButton>
                                </li>
                                <li>
                                    <SocialButton bgcolor={'#60A5E5'}>
                                        <FiTwitter className="icons twitter__icon"/>
                                    </SocialButton>
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
