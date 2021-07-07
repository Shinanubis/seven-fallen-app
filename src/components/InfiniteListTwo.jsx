import {useEffect, useRef, useState } from 'react';
import LoaderGif from '../img/22-2.gif';
import dotenv from 'dotenv';
dotenv.config();

function InfiniteListTwo(props) {
    let isMounted = false;
    
    const { classesContainer, 
            classesElement,
            classesImages,
            classesLoaderList, 
            datas,
            size,
            numPerPage,
            page,
            setPage,
            triggerAt
          } = props;

    /*states*/
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [triggerIndex, setTriggerIndex] = useState(0); 

    /*constantes*/
    const MAX_PAGE = Math.ceil(size / numPerPage)

    /*variables*/
    let listBottom = 0;
    let elmtBottom = 0;

    /* refs */
    let listRef = useRef();
    let elmtRef = useRef();

    /*handlers*/
    const handleScroll = (e) => {
        listBottom = listRef.current.getBoundingClientRect().bottom;
        elmtBottom = elmtRef.current.getBoundingClientRect().bottom;

        if(elmtBottom < listBottom){
            setIsLoadingList(true);  
        }
    }

    /*use effect*/
    useEffect(() => {
            if(isLoadingList === true && page <= MAX_PAGE){
                setPage()   
            }
    },[isLoadingList]);

    useEffect(() => {
        if(isLoadingList === true){
            setIsLoadingList(false);
        }
    },[datas])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll,true);
        return window.removeEventListener("scroll", handleScroll);
    })

    useEffect(() => {
        if(!isMounted){
            console.log("i'm not mounted")
        }
        if( datas.length > triggerIndex){
            setTriggerIndex(triggerAt * page);
        }else if(datas.length < triggerIndex){
            setTriggerIndex(datas.length - 1)   
        }else{
            console.log("something wrong happened")
        }
    },[datas]);

    return (
        <>
            <ul ref={listRef} className={classesContainer ? classesContainer : "infinite__container"}>
                {console.log(triggerIndex)}
                {console.log(datas)}
                {
                    datas instanceof Array &&
                    datas.map((elmt, index) => {
                        return (
                            <li 
                                ref={index === triggerIndex ? elmtRef : null} 
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
            {isLoadingList === true && <img className={classesLoaderList ? classesLoaderList : 'infinite__loader--List'} src={LoaderGif}/>}
        </>
    )
}

export default InfiniteListTwo;
