import React, {useState, useEffect} from 'react';
import {BsFilterRight} from 'react-icons/bs';

function Filters(props){
    const {containerClasses, onClick} = props;

    useEffect(() => {
        
    }, []);

    return (
        <div className={containerClasses ?? "filter__container"} onClick={e => onClick}>
            <BsFilterRight/>
        </div>
    )
}

export default Filters;