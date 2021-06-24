import React from 'react'
const Button = (props) => {
    const {id, classes,bgcolor,color, size,onClick, text, padding} = props
    
    return (

        <button 
            id={id ? id : null}
            type="button"
            className = {classes ? classes : "btn"}
            style={{
                padding: padding ?? padding,
                backgroundColor:bgcolor ?? bgcolor,
                color:color ?? color,
                width: size ?? size
            }}
            onClick={onClick ?? onClick}
        >
        {text}
        </button>
    )
}

export default Button
