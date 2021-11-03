import {createContext, useState, useEffect} from 'react';

/*api*/
import getAuthUser from '../api/Authentication';


const AuthContext = createContext([null, () => {}]);

function AuthContextProvider({children}){
    const [isAuthenticated, setisAuthenticated] = useState();

    useEffect(() => {
        async function fetchData(){
            let response = await getAuthUser();
            setisAuthenticated(response.isAuthenticated) 
        }
        fetchData();  
    },[])

    return (
        <AuthContext.Provider value={[isAuthenticated, setisAuthenticated]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider};