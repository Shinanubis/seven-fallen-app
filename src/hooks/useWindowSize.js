import {useEffect, useState} from 'react'

function useWindowSize(x, y) {
    const [size, setSize] = useState({
        x: window.innerWidth,
        y: window.innerHeight
    });

    const handleResize = () => {
        setSize({
            x: window.innerWidth,
            y: window.innerHeight
        });
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return {...size}
}

export default useWindowSize;
