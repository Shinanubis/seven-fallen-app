import { useState, useEffect, useRef } from "react";
import {debounce, throttle} from 'lodash';

function useInfiniteScroll(theRef, page, limit, max, callback, triggerFromBottom) {
  const [isFetching, setIsFetching] = useState(false);
  const MAX_PAGES = Math.ceil(max / limit);
  const lastElmt = useRef();

  if ( theRef.current !== undefined && theRef.current.children.length > 0) {
    lastElmt.current =
      theRef.current.children[theRef.current.children.length - 1];
  }

  const handleScroll = (e) => {
      if (
        Math.ceil(lastElmt.current.getBoundingClientRect().bottom) - triggerFromBottom <=
        Math.ceil(theRef.current.clientHeight) && theRef !== undefined
      ) {
        if (isFetching === true && page < MAX_PAGES) {
          callback();
        }

        if (isFetching === true && page === MAX_PAGES) {
          setIsFetching(false);
        }

      }
  };

  useEffect(() => {
    if(theRef.current){
      theRef.current.addEventListener("scroll", handleScroll);
          return () => theRef.current.removeEventListener("scroll",handleScroll);
    }
  });

  return [isFetching, setIsFetching];
}

export default useInfiniteScroll;
