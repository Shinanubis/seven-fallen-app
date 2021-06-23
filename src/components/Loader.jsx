import React from 'react';
import { RiLoader3Line } from 'react-icons/ri';

function Loader(props) {
    let { condition, setLoaded } = props;
    return (
        <div className="loader__block row justify-center align-center">
            {             
                condition
                ? 
                setLoaded(true) 
                : 
                null
            }
            <RiLoader3Line className="loader"/>
        </div>
    )
}

export default Loader;
