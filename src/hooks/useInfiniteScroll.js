import { useState, useEffect, useRef, useCallback } from "react";
import { throttle} from 'lodash';

function useInfiniteScroll(hasMore, filters, cb) {
  const [loading, setIsLoading] = useState(false);


  let parentRef = useRef();

  function handleScroll(e){
    if(Math.ceil(e.target.scrollHeight - e.target.scrollTop) <= Math.ceil(e.target.clientHeight + 10)){
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
      if(parentRef.current){
        parentRef.current.removeEventListener('scroll', throttle(handleScroll, 200));
      }
    }
  })

  return [loading, setIsLoading, setRef, parentRef];
}

export default useInfiniteScroll;
