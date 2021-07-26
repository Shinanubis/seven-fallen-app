import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext([false, () => {}]);

function AuthContextProvider(props){
    const {callback} = props;
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setisAuthenticated(true)
        }, 10000)
    },[])

    useEffect(() => {
        console.log(isAuthenticated)
    },[isAuthenticated])

    return (
        <AuthContext.Provider value={[isAuthenticated, setisAuthenticated]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider};