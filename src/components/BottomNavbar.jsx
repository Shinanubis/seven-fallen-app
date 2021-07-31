import { IoSettingsOutline, GrMenu, AiOutlinePlusCircle, BiGridAlt, HiOutlineUsers } from 'react-icons';
import {Link} from 'react-router-dom';

function BottomNavbar(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/profile"/>
                </li>
                <li>
                    <Link to="/decks"/>
                </li>
                <li>
                    <Link to="/decks/create"/>
                </li>
                <li>
                    <Link to="/cards"/>
                </li>
                <li>
                    <Link to="/gamers"/>
                </li>
            </ul>
        </nav>
    )
}

export default BottomNavbar;
