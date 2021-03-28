import { Link } from 'react-router-dom'
import {useState} from 'react'
import {RiSettings3Fill,RiFileList2Fill} from 'react-icons/ri'
import {GrStackOverflow} from 'react-icons/gr'
import {HiOutlineUsers} from 'react-icons/hi'
import './Menu.css'



function Menu (props) {
    const {classes, logged} = props;
    const initialState = {
        item__1: false,
        item__2: logged,
        item__3: false,
        item__4: false
    }
    const [isClicked, setIsClicked] = useState(initialState);


    const handleClick = (e) => {
           e.persist()
           const field = e.currentTarget.id
           setIsClicked(initialState)
           setIsClicked(prevstate => ({...prevstate,
               [field]: true
           }))            
    }

    return (
        <nav className={classes}>
            
            <ul className="menu" >
                <div className="menu__bubble"></div>
                <li id="item__1" onClick={handleClick} className={isClicked.item__1 ? "menu__item move-up" : "menu__item"}>
                    <Link className="menu__link" to="/profile">
                        <RiSettings3Fill className="menu__icon"/>
                    </Link>
                </li>
                <li id="item__2" className={isClicked.item__2 ? "menu__item move-up" : "menu__item"} onClick={handleClick}>
                    <Link   id="item__2" className="menu__link" to="/decks">
                        <RiFileList2Fill className="menu__icon"/>
                    </Link>
                </li>
                <li onClick={handleClick} id="item__3"  className={isClicked.item__3 ? "menu__item move-up" : "menu__item"}>
                    <Link className="menu__link" to="/subscribe">
                        <GrStackOverflow className="menu__icon"/>
                    </Link>
                </li>
                <li onClick={handleClick} id="item__4" className={isClicked.item__4 ? "menu__item move-up" : "menu__item"}>
                    <Link className="menu__link" to="/gamers">
                        <HiOutlineUsers className="menu__icon"/>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;