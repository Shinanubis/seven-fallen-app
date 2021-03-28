import React from 'react'
const Button = (props) => {
    const {classes,bgcolor,color, size,onClick, text} = props
    
    return (

        <button 
            type="button"
            className = {classes}
            style={{
                backgroundColor:bgcolor ?? bgcolor,
                color:color ?? color,
                width: size ?? size
            }}
            onClick={e => onClick(e)}
        >
        {text}
        </button>
    )
}

export default Button
