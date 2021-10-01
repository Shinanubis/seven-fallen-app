import React from 'react'

function Button({id = "btn", text,onClick}) {
    return <button 
                id={id}
                className="create__deck--button" 
                type="button"
                onClick={onClick}
            >
            {text}
            </button>
}

export default Button;
