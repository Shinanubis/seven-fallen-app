import React,{useReducer, useEffect, useState} from 'react'
import DecksContext from '../contexts/DecksContext'
import Plus from '../components/Plus'
import List from '../components/List'
import Deck from '../components/Deck'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import './DecksPage.css'
import { isElementOfType } from 'react-dom/cjs/react-dom-test-utils.development'

function reducer(state, action){
    switch(action.type){
        case 'add':
            return state;
        case 'remove':
            return state.filter(item => item.id !== action.id);
        default:
            return;
    }
}



const DecksPage = (props) => {
    const [decksList, setDecksList] = useState([]);
    useEffect(async () => {
        const response = await fetch('https://test-seven.site/api/decks',{
            method: 'GET',
            credentials: 'include'
        });
        const datas = await response.json();
        setDecksList(datas);
    },[])

    return (
        <List classes="layout layout__1">
            {decksList.map(elmt => {
                return (<Deck title={elmt.deck_name} total_ec={elmt.total_ec} description={elmt.description}/>)
            })}
        </List>
    )
}

export default DecksPage;
