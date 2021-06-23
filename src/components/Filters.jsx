import React from 'react';
import {BsFilterRight} from 'react-icons/bs';

function Filters(props){
    const {containerClasses, onClick, isVisible} = props;

    return (
        <div className={containerClasses ?? "filter__container"} onClick={(e) => onClick(e, isVisible)}>
            <BsFilterRight />
        </div>
    )
}

export default Filters;