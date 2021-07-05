import {useEffect, useRef} from 'react';
import List from "./List";

function InfiniteList(props) {

    const {triggerIndex} = props;

    const handleScroll = (e) => {
        console.log(e.target)
    }

    let listRef = useRef();
    let elmtRef = useRef();

    useEffect(() => {
        listRef.addEventListener('scroll', handleScroll, true);
        return window.removeEventListener('scroll', handleScroll) 
    });

    return (
        <ul ref={listRef} className="subdeck list__content layout layout__1">
            {props.children}
        </ul>
    )
}

export default InfiniteList;
