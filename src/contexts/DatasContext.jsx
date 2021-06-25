import { useState, createContext } from 'react';

const DatasContext = createContext();

function DatasProvider(props){
    
    const [kingdoms, setKingdoms] = useState({
        1:'Poseidia',
        2:'Eondra',
        3:'Endless night',
        4:'MetaScience',
        5:'The light\'s temple',
        6:'Celestial purity',
        7:'The saber\'s way'
    });

    return (
        <DatasContext.Provider value={{kingdoms, setKingdoms}}>
            {props.children}
        </DatasContext.Provider>
    )
}

export { DatasProvider };