import React from 'react'
import {useHistory} from 'react-router-dom'

const NavButton = (props) => {

    if(!props.onClick) props.onClick = () => {return};
    const {text, url, classes, onClick, timing} = props;
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        let result = await onClick(e);
        setTimeout(() => {
            if(result === true){
                history.push(url);
            }
        },timing ? timing : 1000);
    }

    return (
        <button className={classes ? classes : 'btn'} onClick={handleClick}>
            {text}
        </button>
    )
}

export default NavButton
