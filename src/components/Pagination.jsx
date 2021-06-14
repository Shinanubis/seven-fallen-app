import React, {useState, useEffect} from 'react';
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs'


let count = 0;

function Pagination(props){
    const {
        list,
        options, 
        setPage, 
        setSize , 
        containerClasses,
        containerTextBlockClasses, 
        leftClasses, 
        rightClasses, 
        textClasses, 
        listSize = []
    } = props;

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setCounter(counter + list.length);
    },[list]);

    useEffect(() => {
        console.log(counter)
    },[]);

    return (
        <div className={containerClasses ?? "pagination__block"} >
            <div className={leftClasses ?? "pagination__arrow"} onClick={(e) => setPage(e, Number(options.page) - 1, options, list)}><BsChevronLeft/></div>
                <div className={containerTextBlockClasses ?? "pagination__text--block"}>
                {
                    listSize.map((elmt, index) => {
                        return <p key={index} className={textClasses ?? "pagination__text"} onClick={(e) => setSize(e, elmt)}>{elmt}</p>
                    })
                }
                </div>
            <div className={rightClasses ?? "pagination__arrow"} onClick={(e) => setPage(e, Number(options.page) + 1, options, list)}><BsChevronRight/></div>
        </div>
    );
}

export default Pagination;