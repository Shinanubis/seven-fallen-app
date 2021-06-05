import React, {useState} from 'react';

function Pagination(props){
    const {page = '', setpage, setSize, containerClasses = '', leftClasses = '', rightClasses = '', textClasses = '', listSize = ''} = props;
    return (
        <div className={containerClasses ?? "pagination__block"} >
            <span className={leftClasses ?? "pagination__left--arrow"} onClick={setpage(Number(page) + 1)}></span>
            {listSize.map((elmt, index) => {
                <p key={index} className={textClasses ?? "pagination__text"} onClick={setSize(elmt)}>{elmt}</p>
            })}
            <span className={rightClasses ?? "pagination__right--arrow"} onClick={setpage(Number(page) + 1)}></span>
        </div>
    );
}

export default Pagination;