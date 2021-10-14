import {useState, useEffect, forwardRef} from 'react';
import {debounce} from 'lodash';

const InputText = forwardRef(function ({
        id="input__text", 
        classes = "input__text", 
        placeholder="placeholder",
        onChange = () => null,
        debounceTime = 300
    },ref){
    
    const deb = debounce((text) => onChange(text), debounceTime)

    return (
            <input
                id={id} 
                className={classes} 
                ref={ref}
                type="text"
                onChange = {(e) => deb(e.target.value)} 
                placeholder={placeholder}
            />
    )
})


export default InputText;