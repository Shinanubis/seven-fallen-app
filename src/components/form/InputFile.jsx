function InputFile({
        classes = "input__file", 
        id = "input__file",
        onChange = () => ""
    }) {
    return (
        <input 
            id={id} 
            className={classes} 
            type="file"
            onChange ={onChange} 
        />
    )
}

export default InputFile;
