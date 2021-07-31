import { IoSettingsOutline, AiOutlinePlusCircle, GrMenu, BiGridAlt, HiOutlineUsers } from 'react-icons/all';
import { Link } from 'react-router-dom';

function BottomNavbar(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/profile">
                        <IoSettingsOutline />
                    </Link>
                </li>
                <li>
                    <Link to="/decks">
                        <GrMenu />
                    </Link>
                </li>
                <li>
                    <Link to="/decks/create">
                        <AiOutlinePlusCircle />
                    </Link>
                </li>
                <li>
                    <Link to="/cards">
                        <BiGridAlt />
                    </Link>
                </li>
                <li>
                    <Link to="/gamers">
                        <HiOutlineUsers />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default BottomNavbar;
