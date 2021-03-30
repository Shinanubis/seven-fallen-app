import React,{useState,useReducer} from 'react'
import './DecksList.css'
import Deck from './Deck'
import DecksContext from '../contexts/DecksContext'

function reducer(state, action){
    switch(action.type){
        case 'add':
            console.log(state)
            return state;
        case 'remove':
            console.log(state)
            return state.filter(item => item.id !== action.id);
        default:
            return;
    }
}

const DecksList = () => {
    const init = [
        {
            id: 0,
            title: "Gods Deck",
            infos : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            EC: 50
        },
        {
            id: 1,
            title: "Super Power",
            infos : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            EC: 120
        },
        {
            id: 2,
            title: "Berseker",
            infos : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            EC: 80
        },
        {
            id: 3,
            title: "Deck de la mort",
            infos : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            EC: 800
        },
        {
            id: 4,
            title: "Le défonceur",
            infos : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            EC: 1000
        },
    ]

    // const [decksList, setDecksList] = useState(init);
    const [decksList, dispatchList] = useReducer(reducer,init)
    
    return (
        <DecksContext.Provider value={[decksList, dispatchList]}>
            <div className="deck__list">
                {
                    decksList.map((elmt) => 
                        (
                            <Deck 
                                key={elmt.id} 
                                title={elmt.title} 
                                infos={elmt.infos} 
                                EC={elmt.EC}
                                data={elmt}
                            />
                        )
                    )             
                } 
            </div>
        </DecksContext.Provider>
    )
}

export default DecksList
