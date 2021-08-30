import { useState } from "react";

function useDebounce(){
    let [timer, setTimer] = useState("");

    function debounce(func, delay){
        clearTimeout(timer);
        let timeout = setTimeout(() => {
                func()
            }, delay);
        setTimer(timeout)
    }

    return debounce;
}

export default useDebounce;