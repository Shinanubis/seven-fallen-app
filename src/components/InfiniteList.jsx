import {useEffect, useRef, useState} from 'react';
import LoaderGif from '../img/22-2.gif';

const InfiniteList = (props,ref) => {
    /*catch props*/
    const {triggerIndex , children, next, page, size, numPerPage, result} = props;

    /*constant*/
    let MAX_PAGE = Math.ceil(size / numPerPage);

    /*variables*/
    let listBottom = '';
    let elmtBottom = '';


    /*states*/
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState([]);
     
    /*add ref to parent component*/
    let listRef = useRef();

    /*add ref to child component*/
    let elmtRef = useRef();

    if(children.length > triggerIndex){
        children[triggerIndex].ref = elmtRef;
    }else if(children.length > 0){
        children[children.length - 1].ref = elmtRef;
    }else{
        console.log("error")
    }

    const handleScroll = (e) => {
        /*catch the list bottom position in relation to the top of the window*/
        listBottom = listRef.current.getBoundingClientRect().bottom;

        /*catch the targeted element's bottom position in relation to the top of the window*/
        elmtBottom = elmtRef.current.getBoundingClientRect().bottom;

        if(elmtBottom <= listBottom){
            setIsLoading(true);
        }else{
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        if(isLoading === true && page < MAX_PAGE){
            next(page + 1);
        }

    },[isLoading]);

    useEffect(() => {
        setDatas(prevstate => {
            let newDatas = [...prevstate, ...children];   
            return newDatas;
        });
    },[result]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);   
        setIsLoading(false);
        return () => window.removeEventListener('scroll', handleScroll); 
    }, []);

    return (
        <>
            <ul ref={listRef} className="subdeck list__content layout layout__1 mb-2">
                {datas}
                {isLoading === true ? <img className="loader__image my-4" src={LoaderGif}/> : null}
            </ul>
            
        </>
    )
}

export default InfiniteList;
