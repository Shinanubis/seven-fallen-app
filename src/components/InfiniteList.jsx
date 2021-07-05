import {useEffect, useRef, useState} from 'react';

function InfiniteList(props) {

    /*catch props*/
    const {triggerIndex , children} = props;

    /*states*/
    const [isLoading, setIsLoading] = useState(true);

    /*add ref to parent component*/
    let listRef = useRef();

    /*add ref to child component*/
    let elmtRef = useRef();
    children[triggerIndex].ref = elmtRef; 

    const handleScroll = (e) => {
        let listBottom = listRef.current.getBoundingClientRect().bottom;
        let elmtBottom = elmtRef.current.getBoundingClientRect().bottom;
        if(elmtBottom <= listBottom){
            window.removeEventListener('scroll', handleScroll);
        }else{
            window.addEventListener('scroll', handleScroll, true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
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
