import {useEffect, useState} from 'react'

function useVerticalScroll(callback, elmtToListenScroll) {

    const [y, setY] = useState(0);
    
    const handleScroll = (e) => {
        setY(callback);
    }

    useEffect(()  => {
        elmtToListenScroll.addEventListener('scroll', handleScroll);
        return elmtToListenScroll.addEventListener('scroll', handleScroll);
    });

    return y;
}

export default useVerticalScroll;
