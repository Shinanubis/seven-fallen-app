function InputText({classes, placeholder, onChange}) {
    return (
            <input
                className={classes ? classes : "popup__input--field"} 
                type="text"
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder && placeholder}
            />
        )
}

export default InputText;
