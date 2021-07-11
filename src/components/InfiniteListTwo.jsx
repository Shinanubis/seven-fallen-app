import React,{useEffect, useRef, useState } from 'react';
import LoaderGif from '../img/22-2.gif';
import CardsCounter from './CardsCounter';
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
    const [imagesLoading, setImagesLoading] = useState({});

    /*constantes*/
    const MAX_PAGE = Math.ceil(size / numPerPage)

    /*variables*/
    let listBottom = 0;
    let elmtBottom = 0;
    let triggerIndex = 0;
    let isMountedOrUpdated = false;

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

        if(!isMountedOrUpdated){
            if(datas.length < triggerIndex){
                triggerIndex = datas.length - 1;  
            }else if( datas.length >= triggerIndex){
                triggerIndex = triggerAt * page;
            }
        }
        isMountedOrUpdated = true;

    },[datas]);

    useEffect(() => {
        let newObj = {};
        datas.map(elmt => {
            newObj[elmt.id] = false;
        });
        setImagesLoading(newObj);
    }, [])

    useEffect(() => {
        console.log(imagesLoading)
    },[imagesLoading])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll,true);
        return window.removeEventListener("scroll", handleScroll);
    });

    return (
        <>
            <ul ref={listRef} className={classesContainer ? classesContainer : "infinite__container"} onLoad={handleImageLoading} >
                {
                    datas.length > 0 &&
                    datas.map((elmt, index) => {
                            return (
                                    <li key={index}
                                        ref={elmtRef} 
                                        className={classesElement ? classesElement : "infinite__element"}
                                    >
                                        <p id={`cards__counter--${elmt.id}`} className="d-none">{elmt.qty}</p>
                                        <img 
                                            id={elmt.id}
                                            className={classesImages ? classesImages : "infinite__image"} 
                                            src={imagesLoading[elmt.id] === true ? process.env.REACT_APP_CARDS_STATIC + elmt.image_path : LoaderGif}
                                        />
                                        
                                    </li>
                                    )
                                })
                }
            </ul>
            
        </>
    )
}

export default React.memo(InfiniteListTwo);
