import React from 'react'

const CheckBox = (props) => {
    const {classes, name, id} = props

    return (
        <>
          <input id={id} className={classes} type="checkbox" name={name} />  
        </>
    )
}

export default CheckBox
