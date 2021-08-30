import {createContext, useState, useEffect} from 'react';
import {getTypesList,getRaritiesList,getKingdomsList,getExtensionsList} from '../api/CardsWareHouse';
import dotenv from 'dotenv';
dotenv.config();

const SessionContext = createContext();

function SessionContextProvider(props){

    const [language, setLanguage] = useState() 
    const [session, setSession] = useState({
        types: [],
        rarities: [],
        kingdoms: [],
        extensions: []
    });


    useEffect(async () => {
        let datas = {};
        let types = "";
        let rarities = "";
        let kingdoms = "";
        let extensions = "";

        if(localStorage.length === 0){
            localStorage.setItem("lang", "fr");
        }

        if(language !== undefined){
            localStorage.setItem("lang", language)
        }

        if(localStorage.getItem('lang')){
            types = await getTypesList(localStorage.getItem("lang").toUpperCase());
            rarities = await getRaritiesList(localStorage.getItem("lang").toUpperCase());
            kingdoms = await getKingdomsList(localStorage.getItem("lang").toUpperCase());
            extensions = await getExtensionsList(localStorage.getItem("lang").toUpperCase());
        }else{
            return;
        }
              
        
        if(types){
            datas.types = types
        }else{
            datas.types = []
        }

        if(rarities){
            datas.rarities = rarities
        }else{
            datas.rarities = []
        }

        if(kingdoms){
            datas.kingdoms = kingdoms
        }else{
            datas.kingdoms = []
        }

        if(extensions){
            datas.extensions = extensions
        }else{
            datas.extensions = []
        }

        setSession({
            ...session,
            types: datas.types,
            kingdoms: datas.kingdoms,
            rarities: datas.rarities,
            extensions: datas.extensions
        })

    },[language])

    return (
        <SessionContext.Provider value={[session, setLanguage]}>
            {props.children}
        </SessionContext.Provider>
    )
}

export {SessionContext, SessionContextProvider};

