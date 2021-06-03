import React from 'react'

const InputText = ({classes,placeholder,onChange,text,onBlur}) => {
    const search = text;

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
