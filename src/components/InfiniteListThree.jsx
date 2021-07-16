import {useState,useRef, useEffect} from 'react';

/*functions*/
function throttling(callback, delay) {
    let timer = Date.now();

    return function () {
        if(timer + delay - Date.now() < 0){
            callback();
            timer = Date.now()
        }
    }
}

/*components*/
function LoaderList(props) {
    const {classes, url} = props;
    return(
        <img className={classes ? classes : "infinite__scroll--loader"} src={url} alt="loader"/>
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
    const [isLoaded, setIsLoaded] = useState(true);

    /*constantes*/
    const MAX_PAGES = typeof size === 'number' ? Math.ceil(size / numberPerPage) : 0;

    /*refs*/
    let listRef = useRef();
    let elmtRef = useRef();

    /*variables*/
    let listBottom = 0;
    let elmtBottom = 0;

    if(children.type === 'ul'){
        children.ref = listRef;
    }

    if(typeof triggerAt === 'number' && children.props.children !== null){

        if(triggerAt <= children.props.children.length - 1 && page < MAX_PAGES){
            let newIndex = children.props.children.length - numberPerPage + triggerAt;  
            children.props.children[newIndex].ref = elmtRef;
        }
        
        if(page === MAX_PAGES){
            children.props.children[children.props.children.length - 1].ref = elmtRef;
        }

    }

    /*handlers*/
    const handleScroll = (e) => {
            listBottom = Number(listRef.current.getBoundingClientRect().bottom);
            elmtBottom = Number(elmtRef.current.getBoundingClientRect().bottom);
    
            if(listBottom > elmtBottom && page < MAX_PAGES){
                setIsLoaded(false);
            }
    }
            
    /*effect*/

    useEffect(() => {
        if(isLoaded === false){
            setIsLoaded(true);
        }

        if(page === MAX_PAGES && children.props.children.length === size){
            setIsLoaded(true);
        }
    },[datas])

    useEffect(() => {

        if(isLoaded === false && page < MAX_PAGES){
            setPage(page + 1);
        }

        if(isLoaded === false && page === MAX_PAGES){
            setIsLoaded(true);
        }

    }, [isLoaded]);

    useEffect(() => {
        window.addEventListener('scroll',handleScroll, true);
        return window.addEventListener('scroll',handleScroll);
    });

    return (
        <>  
            {children}
            <LoaderList classes={!isLoaded ? loaderListClasses : "d-none"} url={loaderList}/>
        </>
    )
};

export default InfiniteListThree;
