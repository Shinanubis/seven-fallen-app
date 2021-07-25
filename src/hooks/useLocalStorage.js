function useLocalStorage(name) {

    function getItem(name){
        return localStorage.getItem(name);
    }

    function setItem(name, value){
        return localStorage.setItem(name, value);
    }

    function removeItem(name){
        return localStorage.removeItem(name)
    }

    function clearStorage(){
        return localStorage.clear();
    }

    return [
        getItem,
        setItem,
        removeItem,
        clearStorage
    ];
}

export default useLocalStorage;
