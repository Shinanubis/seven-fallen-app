import {useEffect, useRef} from 'react';
import List from "./List";

function InfiniteList(props) {
    /*catch props*/
    const {triggerIndex , children} = props;

    /*add ref to child component*/
    let listRef = useRef();
    let elmtRef = useRef();
    children[triggerIndex].ref = elmtRef; 

    const handleScroll = (e) => {
        console.log("List : ",listRef.current.getBoundingClientRect())
        console.log("List elmt : " , elmtRef.current.getBoundingClientRect())
    }

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return window.removeEventListener('scroll', handleScroll) 
    });

    useEffect(() => {
        console.log(listRef.current.getBoundingClientRect())
        console.log(elmtRef.current.getBoundingClientRect())
    }, []);

    return (
        <ul ref={listRef} className="subdeck list__content layout layout__1">
            {props.children}
        </ul>
    )
}

export default InfiniteList;
