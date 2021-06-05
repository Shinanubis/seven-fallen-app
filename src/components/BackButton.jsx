import React from 'react'
import {useHistory} from 'react-router-dom'

const BackButton = (props) => {
    const {text, url, classes} = props;
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        history.push(url);
    }

    return (
        <button className={classes ? classes : 'btn'} onClick={handleClick}>
            {text}
        </button>
    )
}

export default BackButton;