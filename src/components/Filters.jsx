import React, {useState, useEffect} from 'react';
import {BsFilterRight} from 'react-icons/bs';

function Filters(props){
    const {list, containerClasses} = props;
    useEffect(() => {
        console.log(list);
        console.log(containerClasses);
    }, []);
    return (
        <div className={containerClasses ?? "filter__container"}>
            <BsFilterRight/>
        </div>
    )
}

export default Filters;