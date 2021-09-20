function InputText({id="imput__text", classes = "input__text", placeholder="placeholder"}) {
    return (
       <input id={id} className={classes} type="text" placeholder={placeholder} />
    )
}

export default InputText;