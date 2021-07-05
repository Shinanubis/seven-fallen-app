import {useEffect, useRef} from 'react';
import List from "./List";

function InfiniteList(props) {

    const {triggerIndex , children} = props;
    let elmtRef = useRef();
    children[triggerIndex].ref = elmtRef; 

    const handleScroll = (e) => {
        console.log(e.target)
    }

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return window.removeEventListener('scroll', handleScroll) 
    });

    useEffect(() => {
        console.log(children)
    }, []);

    return (
        <ul className="subdeck list__content layout layout__1">
            {props.children}
        </ul>
    )
}

export default InfiniteList;
