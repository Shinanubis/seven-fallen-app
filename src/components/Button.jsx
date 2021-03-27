import React from 'react'

const Button = (props) => {
    const {classes,bgcolor,color, size} = props
    return (
        <button 
            className={classes}
            style={{"backgroundColor":bgcolor ? bgcolor : "var(--dark-grey)",
                    "color":color ? color : "var(--white)",
                    "width":size ?? size + "%" 
                   }}
            type="button"
        >
            {props.text}
        </button>
    )
}

export default Button
