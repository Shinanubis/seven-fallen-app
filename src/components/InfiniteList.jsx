import {useEffect, useRef} from 'react';
import List from "./List";

function InfiniteList(props) {

    const handleScroll = (e) => {
        console.log(e)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return window.removeEventListener('scroll', handleScroll) 
    });

    return (
        <ul className="subdeck list__content layout layout__1">
            {window.addEventListener('scroll', handleScroll)}
            {props.children}
        </ul>
    )
}

export default InfiniteList;
