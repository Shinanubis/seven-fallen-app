import {useEffect, useRef, useState } from 'react';
import dotenv from 'dotenv';
dotenv.config();

function InfiniteListTwo(props) {
    
    const { classesContainer, 
            classesElement,
            classesImages, 
            datas,
            setPage,
            triggerAt
          } = props;

    /*variables*/
    let listBottom = 0;
    let elmtBottom = 0;

    /* refs */
    let listRef = useRef();
    let elmtRef = useRef();

    /*handlers*/
    const handleScroll = (e) => {
        e.preventDefault()
        listBottom = listRef.getBoundingClientRect().bottom;
        elmtBottom = elmtRef.getBoundingClientRect().bottom;
        console.log(listBottom)
        console.log(elmtBottom)
    }
    
    /*use effect*/
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return window.removeEventListener("scroll", handleScroll);
    },[])

    return (
        <ul ref={listRef} className={classesContainer ? classesContainer : "infinite__container"}>
            {
                datas instanceof Array &&
                datas.map((elmt, index) => {
                    return (
                        <li 
                            ref={index === triggerAt - 1 && elmtRef} 
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
