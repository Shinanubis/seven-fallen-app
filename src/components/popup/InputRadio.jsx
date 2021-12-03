function InputRadio({id, name, value, classes, checked, handleChange}) {
    return <input 
                id={id && id} 
                className={classes ? classes : "popup__input--radio"} 
                type="radio" value={value} 
                name={name && name}
                onChange = {handleChange}
                value = {id}
                checked={checked}
            />
}

export default InputRadio;
