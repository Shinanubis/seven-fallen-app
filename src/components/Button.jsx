import React,{forwardRef} from 'react'
const Button = forwardRef((props) => {
    const {id, classes,bgcolor,color, size,onClick, text, padding} = props
    
    return (

        <button 
            id={id ? id : null}
            type="button"
            className = {classes ? classes : "btn"}
            style={{
                padding: padding ? padding : null,
                backgroundColor:bgcolor ? bgcolor : null,
                color:color ? color : null,
                width: size ? size : null
            }}
            onClick={onClick ? onClick : null}
        >
        {text}
        </button>
    )
})

export default Button
