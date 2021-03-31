import React,{useReducer} from 'react'
import DecksContext from '../contexts/DecksContext'
import DecksList from '../components/DecksList'
import Plus from '../components/Plus'

import './DecksPage.css'

function reducer(state, action){
    switch(action.type){
        case 'add':
            console.log(state)
            return state;
        case 'remove':
            return state.filter(item => item.id !== action.id);
        default:
            return;
    }
}

const DecksPage = () => {

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

    const [decksList, dispatchList] = useReducer(reducer,init);

    return (
        <DecksContext.Provider value={[decksList, dispatchList]}>
            <div className="deck__page">
                <DecksList/>
                <Plus to="/add/deck"/>
            </div>
        </DecksContext.Provider>
    )
}

export default DecksPage
