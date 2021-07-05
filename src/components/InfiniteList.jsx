import {useEffect} from 'react';
import List from "./List";

function InfiniteList(props) {

    const handleScroll = (e) => {
        console.log(e)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return window.removeEventListener('scroll', handleScroll) 
    },[]);

    return (
        <ul classes="subdeck list__content layout layout__1">
            {props.children}
        </ul>
    )
}

export default InfiniteList;
