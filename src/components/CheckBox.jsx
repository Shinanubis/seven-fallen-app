import React from 'react'

const CheckBox = (props) => {
    if(!props.default) props.checked = true;
    const {classes, name, id,text, checked} = props

    return (
        <div className="row">
          <input id={name} className={classes} type="checkbox" name={name} checked={checked}/>
          <label className="form__label" htmlFor={id}>{text}</label>   
        </div>
    )
}

export default CheckBox
