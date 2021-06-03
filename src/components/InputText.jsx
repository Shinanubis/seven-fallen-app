import React from 'react'

const InputText = (props) => {
    const search = text;

    if(!props.onChange) props.onChange = () => {return};
    if(!props.onBlur) props.onBlur = () => {return};

    const {classes,placeholder,onChange,text,onBlur} = props;
    
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e);
    }

    const handleBlur = (e) => {
        e.preventDefault();
        onBlur(e);
    } 
    return (
        <input className={classes} type="text" placeholder={placeholder} onBlur={handleBlur} onChange={handleChange} value={search}/>
    )
}

export default InputText
