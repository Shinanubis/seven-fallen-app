import {useEffect, useRef, useState} from 'react';
import LoaderGif from '../img/22-2.gif';

function InfiniteList(props) {

    /*catch props*/
    const {triggerIndex , children, next, page} = props;

    /*variables*/
    let listBottom = '';
    let elmtBottom = '';

    /*states*/
    const [isLoading, setIsLoading] = useState(true);
     
    /*add ref to parent component*/
    let listRef = useRef();

    /*add ref to child component*/
    let elmtRef = useRef();
    children[triggerIndex].ref = elmtRef; 

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
        next();
    },[isLoading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        setIsLoading(false);
        console.log(page)
        return window.removeEventListener('scroll', handleScroll); 
    },[]);

    return (
        <>
            <ul ref={listRef} className="subdeck list__content layout layout__1 mb-2">
                {props.children}
            </ul>
            {isLoading === true ? <img className="loader__image" src={LoaderGif}/> : null}
        </>
    )
}

export default InfiniteList;
