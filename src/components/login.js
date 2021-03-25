import LoginForm from './loginForm'
import {createPortal} from 'react-dom'


function Login (props) {

        return createPortal(
        
                <LoginForm loginprops = {props} />
                ,document.getElementById('main')
            )
}

export default Login;