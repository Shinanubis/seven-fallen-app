import {useEffect, useState, useRef} from 'react';

const withInfiniteScroll = Component => (props) => {

    const { next, triggerIndex } = props;

    /*state*/
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    /*refs*/
    let listRef = useRef(null);
    listRef.current.onscroll = function(e){
        console.log(e.target)
    }

    useEffect(() => {
        
    }, [])

    return (
        <Component ref={listRef}>
            {props.children}
        </Component>
    )
}

export default withInfiniteScroll;
