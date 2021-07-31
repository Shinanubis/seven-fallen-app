import { IoSettingsOutline, AiOutlinePlusCircle, GrMenu, BiGridAlt, HiOutlineUsers } from 'react-icons/all';
import { Link } from 'react-router-dom';

function BottomNavbar(props) {
    return (
        <nav className="navbar">
            <ul className="menu">
                <li className="menu__element">
                    <Link className="menu__link" to="/profile">
                        <IoSettingsOutline className="icon"/>
                    </Link>
                </li>
                <li>
                    <Link to="/decks">
                        <GrMenu className="icon"/>
                    </Link>
                </li>
                <li>
                    <Link to="/decks/create">
                        <AiOutlinePlusCircle className="icon"/>
                    </Link>
                </li>
                <li>
                    <Link to="/cards">
                        <BiGridAlt className="icon"/>
                    </Link>
                </li>
                <li>
                    <Link to="/gamers">
                        <HiOutlineUsers className="icon"/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default BottomNavbar;
