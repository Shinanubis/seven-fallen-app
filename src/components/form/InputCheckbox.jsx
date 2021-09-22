import React from 'react'

function InputCheckbox({classes = "input__checkbox", value = '', id="", name=""}) {
    return <input id={id} className={classes} type="checkbox" name={name} value={value}/>
}

export default InputCheckbox;
