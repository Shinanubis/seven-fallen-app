import {useState,useRef, useEffect} from 'react';

function throttling(callback, delay) {
    let timerId = undefined;

    return function () {
        if(timerId){
            return;
        }

        setTimeout(() => {
            callback();

            timerId = undefined;
        },delay);
    }
}

function InfiniteListThree(props) {
    const {numberPerPage,size,page,setPage, triggerAt,children, datas} = props;

    /*states*/
    const [isLoading, setIsLoading] = useState(false);

    /*constantes*/
    const MAX_PAGES = Math.ceil(size / numberPerPage);

    /*variables*/
    let listBottom = null;
    let elmtBottom = null;
    let isMounted = false;
    let triggerIndex = 0;

    /*handlers*/
    const handleScroll = (e) => {
        throttling(() => console.log("hello"), 500);
    }

    /*effect*/
    useEffect(() => {
        if(!isMounted){

            if(datas.length < triggerIndex){
                triggerIndex = datas.length - 1;  
            }
            
            if( datas.length >= triggerIndex){
                triggerIndex = triggerAt * page;
            }
        }

        isMounted = true;
    },[datas]);

    return (
        <>  
            {children}
        </>
    )
}

export default InfiniteListThree
