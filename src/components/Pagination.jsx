import React, {useState} from 'react';

function Pagination(props){
    const {page, setpage, setSize, containerClasses, leftClasses, rightClasses, textClasses, listSize} = props;
    return (
        <div className={containerClasses} >
            <span className={leftClasses} onClick={setpage(Number(page) + 1)}></span>
            {listSize.map((elmt, index) => {
                <p key={index} className={textClasses} onClick={setSize(elmt)}>{elmt}</p>
            })}
            <span className={rightClasses} onClick={setpage(Number(page) + 1)}></span>
        </div>
    );
}

export default Pagination;