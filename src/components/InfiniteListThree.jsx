import {useState,useRef, useEffect} from 'react';
import Loader from './Loader';

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
    const {
            numberPerPage,
            size,page,
            setPage, 
            triggerAt,
            children,
            datas,
            loaderListClasses, 
            loaderList
        } = props;

    /*states*/
    const [isLoaded, setIsLoaded] = useState(false);

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

    /*component*/
    let LoaderList = '';
    if(loaderListClasses){
        LoaderList = (props) => <img className={!isLoaded ? loaderListClasses : "d-none"} src={loaderList} alt="loader"/>
    }

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
            {<LoaderList />}
        </>
    )
}

export default InfiniteListThree
