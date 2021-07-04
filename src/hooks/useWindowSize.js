import {useEffect} from 'react'

function useWindowSize(x, y) {
    useEffect(() => {
        console.log("Width : ", x);
        console.log("Height : ", y);
    },[x, y]);
}

export default useWindowSize;
