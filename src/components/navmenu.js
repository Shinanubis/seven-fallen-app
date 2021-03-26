import { Link} from 'react-router-dom'
import './navmenu.css'
import logo from '../img/7-fallen-logo.png'

function Menu () {
    return (
        <ul className="menu">
            <li>
                <Link className="menu__link" to="/">
                    <img className="menu__logo" src={logo} alt="Logo de 7Fallen"/>
                </Link>
            </li>
            <ul className="menu__connect">
                <li className="menu__connect--item">
                    <Link className="menu__connect--link" to="/login">
                        Signin
                    </Link>
                </li>

                <li className="menu__connect--item" >
                    <Link className="menu__connect--link" to="/subscribe">Signup</Link>
                </li>
            </ul>
        </ul>
    );
}

export default Menu;