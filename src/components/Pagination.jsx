import React, {useState, useEffect} from 'react';
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs'


function Pagination(props){
    const {
        options, 
        setPage, 
        setSize , 
        containerClasses,
        containerTextBlockClasses, 
        leftClasses, 
        rightClasses, 
        textClasses, 
        listSize = [],
        nextPage
    } = props;

    const [nextValue, setNextValue] = useState(options);
    
    useEffect(async () => {
        setNextValue(nextValue.page + 1);
        console.log(nextValue)
    });
    
    return (
        <div className={containerClasses ?? "pagination__block"} >
            <div className={leftClasses ?? "pagination__arrow"} onClick={(e) => setPage(e, Number(options.page) - 1, options)}><BsChevronLeft/></div>
                <div className={containerTextBlockClasses ?? "pagination__text--block"}>
                {
                    listSize.map((elmt, index) => {
                        return <p key={index} className={textClasses ?? "pagination__text"} onClick={(e) => setSize(e, elmt)}>{elmt}</p>
                    })
                }
                </div>
            <div className={rightClasses ?? "pagination__arrow"} onClick={(e) => setPage(e, Number(options.page) + 1, options)}><BsChevronRight/></div>
        </div>
    );
}

export default Pagination;