import './navmenu.css'
import logo from '../img/7-fallen-logo.png'
function Menu () {
    return (
        <ul className="navmenu">
            <li>
                <img src={logo}></img>
            </li>
        </ul>
    );
}

export default Menu;