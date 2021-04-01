import React from 'react'

const InputText = ({classes,placeholder,onChange,text}) => {
    const search = text
    return (
        <input className={classes} type="text" placeholder={placeholder} onChange={onChange} value={search}/>
    )
}

export default InputText
