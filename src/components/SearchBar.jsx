import React from 'react'
import InputText from './InputText'
import {AiOutlineSearch} from 'react-icons/ai'

const SearchBar = ({classes,inputClasses,iconClasses,onChange,onClick, placeholder,text}) => {
    return (
        <div className={classes} onClick={onClick}>
            <InputText classes={inputClasses} placeholder={placeholder} onChange={onChange} value={text}/>
            <AiOutlineSearch className={iconClasses}/>
        </div>
    )
}

export default SearchBar
