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
    const {numberPerPage,size,page,setPage, triggerAt,children, datas, loaderList} = props;

    /*states*/
    const [isLoading, setIsLoading] = useState(false);

    /*constantes*/
    const MAX_PAGES = Math.ceil(size / numberPerPage);

    /*refs*/
    let listRef = useRef();
    let elmtRef = useRef();

    /*variables*/
    let listBottom = null;
    let elmtBottom = null;
    let isMounted = false;
    let triggerIndex = 0;
    let LoaderGif = () => loaderList;

    /*handlers*/
    const handleScroll = (e) => {
        listBottom = listRef.current.getBoundingClientRect().bottom;
        elmtBottom = elmtRef.current.getBoundingClientRect().bottom;
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
            {<LoaderGif />}
        </>
    )
}

export default InfiniteListThree
