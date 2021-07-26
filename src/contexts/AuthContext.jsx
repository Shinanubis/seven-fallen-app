import {createContext, useState, useEffect} from 'react';


const AuthContext = createContext([null, () => {}]);

function AuthContextProvider(props){
    const {callback} = props;
    const [isAuthenticated, setisAuthenticated] = useState();

    useEffect(async () => {
        let response = await callback();
        setisAuthenticated(response.isAuthenticated)   
    },[])

    return (
        <AuthContext.Provider value={[isAuthenticated, setisAuthenticated]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider};