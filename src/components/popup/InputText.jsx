import React from 'react'

function InputText({classes, setValue, placeholder, text}) {
    
    const handleChange = (e) => {
        setValue(e)
    }

    return (
            <input 
                className={classes ? classes : "popup__input--field"} 
                type="text"
                placeholder={placeholder && placeholder}
                onChange={handleChange}
                value={text} 
            />
        )
}

export default InputText;
