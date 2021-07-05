import {useEffect, useRef} from 'react';
import List from "./List";

function InfiniteList(props) {
    /*catch props*/
    const {triggerIndex , children} = props;

    /*add ref to child component*/
    let elmtRef = useRef();
    children[triggerIndex].ref = elmtRef; 

    const handleScroll = (e) => {
        console.log(e.target.scrollTop)
        console.log(elmtRef.current.getBoundingClientRect())
    }

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return window.removeEventListener('scroll', handleScroll) 
    });

    useEffect(() => {
        console.log(elmtRef.current)
    }, []);

    return (
        <ul className="subdeck list__content layout layout__1">
            {props.children}
        </ul>
    )
}

export default InfiniteList;
