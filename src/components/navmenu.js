import './navmenu.css'
import logo from '../img/7-fallen-logo.png'
function Menu () {
    return (
        <ul className="menu">
            <li>Test 1</li>
            <li>Test 2</li>
            <li>
                <img className="menu__logo" src={logo}></img>
            </li>
            <li>Test 3</li>
            <li>Test 4</li>
        </ul>
    );
}

export default Menu;