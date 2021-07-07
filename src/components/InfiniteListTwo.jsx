import {useEffect, useRef, useState } from 'react';
import dotenv from 'dotenv';
dotenv.config();

function InfiniteListTwo(props) {
    
    const { classesContainer, 
            classesElement,
            classesImages, 
            datas,
            numPerPage,
            setPage,
            triggerAt
          } = props;

    /*variables*/
    let listBottom = 0;
    let elmtBottom = 0;
    let newTriggerAt = 0;

    if(triggerAt > datas.length){
        newTriggerAt = datas.length - 1;
    }else if(triggerAt <= datas.length - 1){
        newTriggerAt = triggerAt;
    }else{
        console.error("Your trigger value is not good")
    }

    /* refs */
    let listRef = useRef();
    let elmtRef = useRef();

    /*handlers*/
    const handleScroll = (e) => {
        listBottom = listRef.current.getBoundingClientRect().bottom;
        elmtBottom = elmtRef.current.getBoundingClientRect().bottom;
    }

    /*use effect*/
    useEffect(() => {
        window.addEventListener("scroll", handleScroll,true);
        return window.removeEventListener("scroll", handleScroll);
    })

    return (
        <ul ref={listRef} className={classesContainer ? classesContainer : "infinite__container"}>
            {
                datas instanceof Array &&
                datas.map((elmt, index) => {
                    return (
                        <li 
                            ref={index === triggerAt ? elmtRef : null} 
                            className={classesElement ? classesElement : "infinite__element"}
                        >
                            <img 
                                className={classesImages ? classesImages : "infinite__image"} 
                                src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} 
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default InfiniteListTwo;
