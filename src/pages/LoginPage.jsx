import './LoginPage.css';
import {useState} from 'react';
import {useHistory} from 'react-router-dom'
import SocialButton from '../components/SocialButton';
import Separator from '../components/Separator'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebookF} from 'react-icons/fa'
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
                <ul className="social__icons--list">
                    <li>
                        <SocialButton bgcolor="#395693" url="https://test-seven.site/api/auth/facebook">
                            <FaFacebookF className="icons facebook__icon"/>
                            <span className="btn__social--text">Login facebook</span> 
                        </SocialButton>
                    </li>
                    <li>
                        <SocialButton bgcolor="#F7F7F7" url="https://test-seven.site/api/auth/google">
                            <FcGoogle className="icons google__icon" />
                            <span className="btn__social--text">Login Google</span>
                        </SocialButton>
                    </li>
                </ul>
            )

}

export default Login;
