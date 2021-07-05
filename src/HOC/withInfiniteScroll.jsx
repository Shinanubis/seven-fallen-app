import {useEffect, useState, useRef} from 'react';

const withInfiniteScroll = Component => (props) => {

    const { next, triggerIndex } = props;

    /*state*/
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleScroll = (e) => {
        setPage(e.target.id);
    }

    let elmt = useRef();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return window.removeEventListener('scroll', handleScroll);
    });

    return (
        <Component ref={elmt}>
            {props.children}
        </Component>
    )
}

export default withInfiniteScroll;
