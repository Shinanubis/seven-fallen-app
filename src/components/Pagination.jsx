import React, {useState} from 'react';
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs'

function Pagination(props){
    const {
        page = 1, 
        setPage = () => {}, 
        setSize = () => {}, 
        containerClasses,
        containerTextBlockClasses, 
        leftClasses, 
        rightClasses, 
        textClasses, 
        listSize = []
    } = props;

    return (
        <div className={containerClasses ?? "pagination__block"} >
            <div className={leftClasses ?? "pagination__arrow"} onClick={(e) => setPage(e, Number(page) + 1)}><BsChevronLeft/></div>
                <div className={containerTextBlockClasses ?? "pagination__text--block"}>
                {
                    listSize.map((elmt, index) => {
                        return <p key={index} className={textClasses ?? "pagination__text"} onClick={(e) => setSize(e, elmt)}>{elmt}</p>
                    })
                }
                </div>
            <div className={rightClasses ?? "pagination__arrow"} onClick={(e) => setPage(e, Number(page) + 1)}><BsChevronRight/></div>
        </div>
    );
}

export default Pagination;