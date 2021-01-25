function debounce(fn, ms) {

    let timeout
    if(timeout === undefined){
        timeout = setTimeout(fn,ms)
        
    }
    return timeout
}
export {debounce};