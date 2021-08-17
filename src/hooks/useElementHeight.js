import {useEffect} from 'react';

function useElementHeight(elmtId){
    let elmtHeight = null;

    useEffect(() => {
        elmtHeight = document.getElementById(elmtId).offsetHeight;
    },[elmtId]);

    return [elmtHeight];
    
}

export default useElementHeight;