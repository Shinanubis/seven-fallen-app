import {useState,useRef, useEffect, forwardRef} from 'react';
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

/*components*/
function LoaderList(props) {
    const {classes, url} = props;
    return(
        <img className={classes && classes} src={url} alt="loader"/>
    )
}

const InfiniteListThree = (props) => {
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
    const [y, setY] = useState();

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

    /*handlers*/
    const handleScroll = (e) => {
        listBottom = listRef.current.getBoundingClientRect().bottom;
        elmtBottom = elmtRef.current.getBoundingClientRect().bottom;
        console.log(elmtBottom)
    }

    if(children.type === 'ul'){
        children.ref = listRef;
        children.onScroll = handleScroll;
    }

    if(typeof triggerAt === 'number'){
        if(triggerAt < children.props.children.length - 1){
            children.props.children[triggerAt].ref = elmtRef;
        }
    
        if(triggerAt >= children.props.children.length - 1){
            children.props.children[children.props.children.length - 1].ref = elmtRef;
        }
    }else{
        console.error("triggerAt props should be a number")
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

        if(isLoaded === false){
            setIsLoaded(true);
        }
        
    },[datas]);

    useEffect(() => {
        window.addEventListener('scroll',handleScroll);
        return window.addEventListener('scroll',handleScroll);
    });

    return (
        <>  
            {children}
            {!isLoaded && <LoaderList classes={loaderListClasses} url={loaderList}/>}
        </>
    )
};

export default InfiniteListThree;
