import React from 'react'
import './SocialButton.css'
const SocialButton = (props) => {
    const {onClick} = props;
    return (
        <button style={{backgroundColor:props.bgcolor}} className="btn btn__social" onClick={onClick}>
            {props.children}
        </button>
    )
}

export default SocialButton;
