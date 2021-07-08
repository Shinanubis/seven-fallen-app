import React,{useEffect, useRef, useState } from 'react';
import LoaderGif from '../img/22-2.gif';
import dotenv from 'dotenv';
dotenv.config();

function InfiniteListTwo(props) {
    
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
    const [imagesLoading, setImagesLoading] = useState({});

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

        if(page < MAX_PAGE && elmtBottom < listBottom){
            setIsLoadingList(true);
        }

        if(page === MAX_PAGE && elmtBottom){
            setIsLoadingList(false);
        }

    }

    const handleImageLoading = (e) => {
        if(e.target.id){
            setImagesLoading(prevstate => {
                let newObj = {...prevstate, [e.target.id]: true};
                return newObj;
            });
        }
    }

    /*use effect*/
    useEffect(() => {
            if(isLoadingList === true && page < MAX_PAGE){
                setPage()   
            }  
    },[isLoadingList]);

    useEffect(() => {
        if(isLoadingList === true){
            setIsLoadingList(false);
        }

        if(page === MAX_PAGE && datas.length === size - 1){
            setIsLoadingList(false);
        }

        if(datas.length < triggerIndex){
            setTriggerIndex(datas.length - 1)   
        }else if( datas.length > triggerIndex){
            setTriggerIndex(triggerAt * page);
        }else{
            console.log("something wrong happened")
        }

        let newObj = {};
        datas.map(elmt => {
            newObj[elmt.id] = false;
        })
        setImagesLoading(newObj);

    },[datas]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll,true);
        return window.removeEventListener("scroll", handleScroll);
    });

    return (
        <>
            <ul ref={listRef} className={classesContainer ? classesContainer : "infinite__container"} onLoad={handleImageLoading} >
                {console.log(imagesLoading)}
                {
                    datas instanceof Array &&
                    datas.map((elmt, index) => {
                        if(triggerIndex <= datas.length){
                            return (
                                    <li key={index}
                                        ref={index === triggerIndex ? elmtRef : null} 
                                        className={classesElement ? classesElement : "infinite__element"}
                                    >
                                        <img 
                                            id={elmt.id}
                                            className={classesImages ? classesImages : "infinite__image"} 
                                            src={imagesLoading[elmt.id] === true ? process.env.REACT_APP_CARDS_STATIC + elmt.image_path : LoaderGif}
                                        />
                                    </li>
                                    )
                        }else{
                            return (
                                    <>
                                        <li 
                                            key={index}
                                            ref={index === datas.length - 1 ? elmtRef : null} 
                                            className={classesElement ? classesElement : "infinite__element"}
                                        >
                                            <img 
                                                id={elmt.id}
                                                className={classesImages ? classesImages : "infinite__image"} 
                                                src={imagesLoading[elmt.id] === true ? process.env.REACT_APP_CARDS_STATIC + elmt.image_path : LoaderGif} 
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
