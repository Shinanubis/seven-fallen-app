function InputRadio({id, name,value,classes, checked}) {
    return <input 
                id={id && id} 
                className={classes ? classes : "popup__input--radio"} 
                type="radio" value={value} 
                name={name && name}
                checked={checked && checked} 
            />
}

export default InputRadio;
