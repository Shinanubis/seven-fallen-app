import React,{useReducer, useEffect, useState} from 'react'
import DecksContext from '../contexts/DecksContext'
import Plus from '../components/Plus'
import List from '../components/List'
import Deck from '../components/Deck'
import './DecksPage.css'

function reducer(state, action){
    switch(action.type){    
        case 'ADD':
            return state;
        case 'DEL':
            return state.filter(item => item.id !== action.id);
        default:
            return;
    }
}

const DecksPage = () => {
    const [decksList, setDecksList] = useState([]);

    useEffect(async () => {
            let response = await fetch('https://test-seven.site/api/decks',{
            method: 'GET',
            credentials: 'include'
        });
        let datas = await response.json();
        setDecksList(datas);
    },[])

    return (
            <List classes="layout layout__1">
                {decksList.map(elmt => {
                    return (
                            <Deck id={elmt.id} 
                                  title={elmt.deck_name} 
                                  num_cards= {elmt.num_cards}
                                  total_ec={elmt.total_ec} 
                                  description={elmt.description}/>
                            )
                })}
            </List>
    )
}

export default DecksPage;
