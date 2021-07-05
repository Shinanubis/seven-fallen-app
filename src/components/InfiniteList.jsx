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
        let listBottom = listRef.current.getBoundingClientRect().bottom;
        let elmtBottom = elmtRef.current.getBoundingClientRect().bottom;
        console.log("listBottom : ", listBottom)
        console.log("elmtBottom : ", elmtBottom)
    }

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return window.removeEventListener('scroll', handleScroll) 
    });

    useEffect(() => {
        console.log("List : ",listRef.current.getBoundingClientRect())
        console.log("List elmt : " ,elmtRef.current.getBoundingClientRect())
    }, []);

    return (
        <ul ref={listRef} className="subdeck list__content layout layout__1">
            {props.children}
        </ul>
    )
}

export default InfiniteList;
