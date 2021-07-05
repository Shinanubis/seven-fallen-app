import {useEffect, useRef, useState} from 'react';

function InfiniteList(props) {

    /*catch props*/
    const {triggerIndex , children} = props;

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
        listBottom = listRef.current.getBoundingClientRect().bottom;
        elmtBottom = elmtRef.current.getBoundingClientRect().bottom;
        if(elmtBottom <= listBottom){
            setIsLoading(true);
        }else{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        setIsLoading(false);
        return window.removeEventListener('scroll', handleScroll); 
    },[]);

    return (
        <ul ref={listRef} className="subdeck list__content layout layout__1">
            {props.children}
            {isLoading === true ? <h4 className="title"> loading ...</h4> : null}
        </ul>
    )
}

export default InfiniteList;
