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

async function getDatas(url){
    let response = await fetch(url,{
        method: 'GET',
        credentials: 'include'
    });
    let datas = await response.json()
    return datas;
}

const DecksPage = (props) => {
    const [decksList, setDecksList] = useState([]);
    const [decks, dispatch] = useReducer(reducer, []);

    useEffect(async () => {
        const datas = await getDatas('https://test-seven.site/api/decks');
        setDecksList(datas);
    },[])

    return (
        <DecksContext state={decks} dispatcher={dispatch}>
            <List classes="layout layout__1">
                {decksList.map(elmt => {
                    return (<Deck id={elmt.id} 
                                  title={elmt.deck_name} 
                                  num_cards= {elmt.num_cards}
                                  total_ec={elmt.total_ec} 
                                  description={elmt.description}/>
                            )
                })}
            </List>
            <button onClick={() => dispatch({type: 'ADD'})}>Valider</button>
        </DecksContext>
    )
}

export default DecksPage;
