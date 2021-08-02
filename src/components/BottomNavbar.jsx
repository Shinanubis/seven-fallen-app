import { IoSettingsOutline, AiOutlinePlusCircle, GrMenu, BiGridAlt, HiOutlineUsers } from 'react-icons/all';
import Navbar from './navbar';

function BottomNavbar(props) {
    return (
        <Navbar>
            <Navbar.Link to="/profile">
                <Navbar.Icon icon={IoSettingsOutline} />
            </Navbar.Link>
            <Navbar.Link to="/decks">
                <Navbar.Icon icon={GrMenu} />
            </Navbar.Link>
            <Navbar.Link to="/decks/create">
                <Navbar.Icon icon={AiOutlinePlusCircle} />
            </Navbar.Link>
            <Navbar.Link to="/cards">
                <Navbar.Icon icon={BiGridAlt} />
            </Navbar.Link>
            <Navbar.Link to="/gamers">
                <Navbar.Icon icon={HiOutlineUsers} />
            </Navbar.Link>
        </Navbar>
    )
}

export default BottomNavbar;
