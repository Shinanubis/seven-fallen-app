function useSessionStorage(name) {

    function getItem(name){
        return sessionStorage.getItem(name);
    }

    function setItem(name, value){
        return sessionStorage.setItem(name, value);
    }

    function removeItem(name){
        return sessionStorage.removeItem(name)
    }

    function clearStorage(){
        return sessionStorage.clear();
    }

    return [
        getItem,
        setItem,
        removeItem,
        clearStorage
    ];
}

export default useSessionStorage;
