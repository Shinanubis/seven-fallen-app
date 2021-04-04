import React from 'react'
import {useHistory} from 'react-router-dom'

const NavButton = (props) => {
    const {text, url,classes} = props;
    const history = useHistory();
    const handleClick = () => {
        history.push(url);
    }
    return (
        <button className={classes ? classes : 'btn'} onClick={handleClick}>
            {text}
        </button>
    )
}

export default NavButton
