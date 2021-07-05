import {useEffect, useState, useRef} from 'react';

const withInfiniteScroll = Component => (props) => {

    const { next, triggerIndex } = props;

    /*state*/
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    /*refs*/
    let listRef = useRef(null);

    useEffect(() => {
        console.log(listRef)
    }, [])

    return (
        <Component ref={listRef}>
            {props.children}
        </Component>
    )
}

export default withInfiniteScroll;
