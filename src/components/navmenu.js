import './navmenu.css'
import logo from '../img/7-fallen-logo.png'
function Menu () {
    return (
        <ul className="menu">
            <li className="menu-item">
                Version 1.0.0
            </li>
            <li>
                <img className="menu__logo" src={logo}></img>
            </li>
            <ul className="menu__connect">
                <li>
                    <a href="/login">login</a>
                </li>
            </ul>
        </ul>
    );
}

export default Menu;