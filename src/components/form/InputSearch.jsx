import {forwardRef} from 'react';
import {HiSearch} from 'react-icons/hi';
import {debounce} from 'lodash';

const InputSearch = forwardRef(function ({
        id="input__search", 
        classes = "input__search", 
        placeholder="placeholder",
        isLoading = false,
        icon = () => <HiSearch/>,
        iconClasses = "input__search--icon",
        onChange = () => null,
        onClick = (e) => null,
        debounceTime = 300
    },ref){
    
    const deb = debounce((text) => onChange(text), debounceTime);
    const debClick = debounce((e) => onClick(e), debounceTime);
    const Icon = icon;
    return (
        <>
            <input
                id={id} 
                className={classes} 
                ref={ref}
                type="text"
                onChange = {(e) => deb(e.target.value)} 
                placeholder={placeholder}
            />
            <div className={iconClasses} onClick={debClick}>
                <Icon />
            </div>
        </>
    )   
})


export default InputSearch;