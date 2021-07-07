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
            if(isLoadingList === true && page < MAX_PAGE){
                setPage()   
            }

            if(isLoadingList === true && page === MAX_PAGE){
                setIsLoadingList(false)
            }   
    },[isLoadingList]);

    useEffect(() => {
        if(isLoadingList === true){
            setIsLoadingList(false);
        }

        if(page === MAX_PAGE && datas.length === size - 1){
            setIsLoadingList(false);
        }

        if( datas.length > triggerIndex){
            setTriggerIndex(triggerAt * page);
        }else if(datas.length < triggerIndex){
            setTriggerIndex(datas.length - 1)   
        }else{
            console.log("something wrong happened")
        } 

    },[datas]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll,true);
        return window.removeEventListener("scroll", handleScroll);
    })

    return (
        <>
            <ul ref={listRef} className={classesContainer ? classesContainer : "infinite__container"}>
                {
                    datas instanceof Array &&
                    datas.map((elmt, index) => {
                        if(triggerIndex <= datas.length){
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
                        }else{
                            return (
                                    <>
                                        <li 
                                            ref={index === datas.length - 1 ? elmtRef : null} 
                                            className={classesElement ? classesElement : "infinite__element"}
                                        >
                                            <img 
                                                className={classesImages ? classesImages : "infinite__image"} 
                                                src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} 
                                            />
                                        </li>
                                    </>
                            )
                        }
                    })
                }
            </ul>
            {isLoadingList === true && <img className={classesLoaderList ? classesLoaderList : 'infinite__loader--List'} src={LoaderGif}/>}
        </>
    )
}

export default InfiniteListTwo;
