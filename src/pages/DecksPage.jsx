import React,{useEffect, useState} from 'react'
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
                {decksList.map((elmt, index) => {
                    console.log(elmt)
                    return (
                            
                            <Deck id={elmt[index].id} 
                                  title={elmt[index].deck_name} 
                                  num_cards= {elmt[index].num_cards}
                                  total_ec={elmt[index].total_ec} 
                                  description={elmt[index].description}/>
                            )
                })}
            </List>
    )
}

export default DecksPage;
