import React from 'react'

const CheckBox = (props) => {
    
    const {classes, name, id,text, checked, onChange} = props

    return (
        <div className="row">
          <input id={name} className={classes} type="checkbox" name={name} onChange={onChange}/>
          <label className="form__label" htmlFor={id}>{text}</label>   
        </div>
    )
}

export default CheckBox
