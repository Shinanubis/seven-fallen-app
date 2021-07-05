import {useEffect, useState} from 'react'

function useWindowSize(x, y) {
    const [size, setSize] = useState({
        x,
        y
    });

    useEffect(() => {
        setSize({
            x:x,
            y:y
        });
    },[x, y]);

    return {...size};
}

export default useWindowSize;
