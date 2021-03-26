import React from 'react'
import './SocialButton.css'
const SocialButton = (props) => {
    return (
        <button style={{backgroundColor:props.bgcolor}}className="btn btn__social">
            {props.icon}
            {props.text}
        </button>
    )
}

export default SocialButton;
