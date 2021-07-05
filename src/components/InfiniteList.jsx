import {useEffect, useRef} from 'react';
import List from "./List";

function InfiniteList(props) {

    const {triggerIndex , children} = props;

    const handleScroll = (e) => {
        console.log(e.target)
    }

    let elmtRef = useRef();

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
