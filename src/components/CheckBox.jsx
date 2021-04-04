import React from 'react'

const CheckBox = (props) => {
    const {classes, name, id,text} = props

    return (
        <div className="row">
          <input id={name} className={classes} type="checkbox" name={name} />
          <label className="form__label" htmlFor={id}>{text}</label>   
        </div>
    )
}

export default CheckBox
