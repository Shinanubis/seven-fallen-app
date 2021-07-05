import {useEffect, useState, useRef} from 'react';

const withInfiniteScroll = Component => (props) => {

    const { next, triggerIndex } = props;

    /*state*/
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleOnScroll = (e) => {
        console.log(e.target)
    }

    return (
        <Component onScroll={handleOnScroll}>
            {props.children}
        </Component>
    )
}

export default withInfiniteScroll;
