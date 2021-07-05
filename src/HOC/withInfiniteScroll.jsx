import {useEffect, useState, useRef} from 'react';

const withInfiniteScroll = Component => (props) => {

    const { next, triggerIndex } = props;

    /*state*/
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleScroll = (e) => {
        console.log(e)
        setPage(e)
    }

    let elmt = useRef();

    useEffect(() => {
        console.log(elmt)
        window.addEventListener('scroll', handleScroll);
        return window.removeEventListener('scroll', handleScroll);
    },[page]);

    return (
        <Component ref={elmt}>
            {props.children}
        </Component>
    )
}

export default withInfiniteScroll;
