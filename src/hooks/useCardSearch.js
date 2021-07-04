import {useEffect, useState} from 'react'

function useCardSearch(func, query, pageNumber, delay) {
    const [loading, setLoading] = useState(true);
    
    useEffect(async () =>{
        let response = "";
        setTimeout(() => {
            response = await func();
        }, delay || 200);
        
    }, [query, pageNumber]);
    return null;
}

export default useCardSearch;
