import React from 'react'
import {useHistory} from 'react-router-dom'

const NavButton = (props) => {
    const {text, url,classes, onClick} = props;
    const history = useHistory();
    const handleClick = (e) => {
        onClick ?? onClick(e);
        history.push(url);
    }
    return (
        <button className={classes ? classes : 'btn'} onClick={handleClick}>
            {text}
        </button>
    )
}

export default NavButton
