import { useState, useEffect, useRef, useCallback } from "react";
import {debounce, throttle} from 'lodash';

function useInfiniteScroll(hasMore) {
  const [loading, setIsLoading] = useState(false);
  let parentRef = useRef();

  function handleScroll(e){
    if((e.target.scrollHeight * 0.9) - e.target.scrollTop <= e.target.clientHeight){
      setIsLoading(true);
    }
  }

  let setRef = useCallback((node) => {
    if(node){
      parentRef.current = node;
    }

    if(parentRef.current){
      parentRef.current.addEventListener('scroll',throttle(handleScroll, 200));
    }  
  },[])

  useEffect(() => {
    return () => {
      parentRef.current.removeEventListener('scroll', throttle(handleScroll, 500));
    }
  },[])

  return [loading, setIsLoading, setRef];
}

export default useInfiniteScroll;
