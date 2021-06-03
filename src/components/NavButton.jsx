import React from 'react'
import {useHistory} from 'react-router-dom'

const NavButton = (props) => {

    if(!props.onClick) props.onClick = () => {return};
    const {text, url, classes, onClick} = props;
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        let result = onClick(e);
        console.log(result)
        if(result === true){
            history.push(url);
        }
    }

    return (
        <button className={classes ? classes : 'btn'} onClick={handleClick}>
            {text}
        </button>
    )
}

export default NavButton
