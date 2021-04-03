import React from 'react'

const CheckBox = (props) => {
    const {classes, name} = props
    return (
        <>
          <input className={classes} type="checkbox" name={name} id={name} />  
        </>
    )
}

export default CheckBox
