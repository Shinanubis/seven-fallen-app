import React from 'react'

const InputText = ({classes,placeholder,onChange,text,onBlur}) => {
    const search = text
    return (
        <input className={classes} type="text" placeholder={placeholder} onBlur={onBlur} onChange={onChange} value={search}/>
    )
}

export default InputText
