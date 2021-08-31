import React from 'react'

function Button({onClick, text, id}) {
    return (
        <button id={id && id} className="popup__button" type="button" onClick={onClick ? onClick : null}>
            {text ? text : "action"}
        </button>
    )
}

export default Button
