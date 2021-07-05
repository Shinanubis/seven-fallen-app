import {useEffect, useState, useRef} from 'react';

const withInfiniteScroll = Component => (props) => {
    /*state*/
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    /*refs*/
    let listRef = useref(null);


    useEffect(() => {

    }, [])

    return (
        <Component ref={listRef}>
            {props.children}
        </Component>
    )
}

export default withInfiniteScroll;
