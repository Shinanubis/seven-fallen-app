function Button({
        id = "btn", 
        classes = "btn", 
        variant = "button", 
        text = "button" 
    }) {

    return  <button id={id} className={classes} type={variant}>{text}</button>
}

export default Button;
