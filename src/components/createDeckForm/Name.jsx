import React from 'react'

function Name({placeholder, value,onChange, onClick, change}) {
    return <input 
                  className="create__deck--name" type="text"
                  onChange={change}
                  onClick={onClick} 
                  placeholder={placeholder ? placeholder : "Enter your text ..."} 
                  value={value && value}
            />
}

export default Name;
