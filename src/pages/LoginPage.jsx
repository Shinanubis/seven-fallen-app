import './LoginPage.css';
import {useState} from 'react';
import {useHistory} from 'react-router-dom'
import FBButton from '../components/FBButton';
import SocialButton from '../components/SocialButton';
import Separator from '../components/Separator'
import {AiOutlineGooglePlus,AiOutlineApple} from 'react-icons/ai'
import {FiTwitter} from 'react-icons/fi'
import AuthenticationContext from "../contexts/Context"
import dotenv from 'dotenv';
dotenv.config();


function Login(props) {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const history = useHistory();

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
