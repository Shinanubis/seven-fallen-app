import React,{useReducer, useEffect, useState} from 'react'
import DecksContext from '../contexts/DecksContext'
import Plus from '../components/Plus'
import List from '../components/List'
import Deck from '../components/Deck'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import './DecksPage.css'

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
    const [list, setList] = useState();
    useEffect(() => {
        fetch('https://test-seven.site/api/decks',{
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setList(data));
        console.log(list)
    },[])

    const [decksList, dispatchList] = useReducer(reducer,list);
    console.log(decksList);
    return (
        <DecksContext.Provider value={[decksList, dispatchList]}>
            <Header classes="header">
                <h1>{props.location.pathname.split('/').pop()}</h1>
            </Header>
            <Main classes="page">
                <List classes="layout mb-5">
                    {
                        list.map(elmt => <Deck key={elmt.id} title={elmt.deck_name} />)
                    }
                </List>
                <Plus to="/decks/new-deck"/>
            </Main>
        </DecksContext.Provider>
    )
}

export default DecksPage;
