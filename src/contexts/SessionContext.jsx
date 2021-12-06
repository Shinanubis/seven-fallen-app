import {createContext, useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthContext';
import Loader from '../components/Loader';
import {FiLoader} from 'react-icons/fi';

import {
    getTypesList,
    getRaritiesList,
    getKingdomsList,
    getExtensionsList,
    getDivinities
} from '../api/CardsWareHouse';
import dotenv from 'dotenv';
dotenv.config();

const SessionContext = createContext();

function SessionContextProvider({children}){
    let Children = () => children;
    const [language, setLanguage] = useState() 
    const [session, setSession] = useState({
        loading: true,
        types: [],
        rarities: [],
        kingdoms: [],
        extensions: []
    });

    const authContext = useContext(AuthContext)

    useEffect(() => {
        async function getAllDatas(){
            let datas = {};
            let types = "";
            let rarities = "";
            let kingdoms = "";
            let extensions = "";
            let divinities = [];  

            if(localStorage.length === 0){
                localStorage.setItem("lang", "fr");
            }

            if(language !== undefined){
                localStorage.setItem("lang", language)
            }

            if(session.types.length > 0){
                // eslint-disable-next-line array-callback-return
                session.types.map(elmt => {
                    if(
                        elmt.id === 8 && 
                        elmt.name === "Adorateur" && 
                        localStorage.getItem('lang') === 'fr'
                       ){
                        // eslint-disable-next-line array-callback-return
                        return;
                    }

                    if(
                        elmt.id === 8 && 
                        elmt.name === "Worshipper" && 
                        localStorage.getItem('lang') === 'en'
                       ){
                        // eslint-disable-next-line array-callback-return
                        return;
                    }
                })
            }

            if(localStorage.getItem('lang') && authContext[0]){
                types = await getTypesList(localStorage.getItem("lang").toUpperCase());
                rarities = await getRaritiesList(localStorage.getItem("lang").toUpperCase());
                kingdoms = await getKingdomsList(localStorage.getItem("lang").toUpperCase());
                divinities = await getDivinities(1,40,localStorage.getItem("lang").toUpperCase(), 1);
                extensions = await getExtensionsList(localStorage.getItem("lang").toUpperCase());
            }else{
                return;
            }

            if(types){
                datas.types = types;
            }else{
                datas.types = [];
            }

            if(rarities){
                datas.rarities = rarities;
            }else{
                datas.rarities = [];
            }

            if(kingdoms){
                datas.kingdoms = kingdoms;
            }else{
                datas.kingdoms = [];
            }

            if(extensions){
                datas.extensions = extensions;
            }else{
                datas.extensions = [];
            }

            if(divinities){
                datas.divinities = divinities;
            }else{
                datas.divinities = [];
            }

            setSession({
                ...session,
                loading: false,
                types: datas.types,
                kingdoms: datas.kingdoms,
                rarities: datas.rarities,
                extensions: datas.extensions,
                divinities: datas.divinities
            })
        }
        getAllDatas();
    },[language, authContext])

    return (
        <SessionContext.Provider value={[session, setLanguage]}>
                {children}
        </SessionContext.Provider>
    )
}

export {SessionContext, SessionContextProvider};

