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
    const [list, setList] = useState({})
    useEffect(() => {
        fetch('https://test-seven.site/api/decks',{
            method: 'GET',
            credentials: 'true'
        })
        .then(response => response.json())
        .then(data => setList(data))
    })
    console.log(list)
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
            EC: 900
        },
    ]

    const [decksList, dispatchList] = useReducer(reducer,init);

    return (
        <DecksContext.Provider value={[decksList, dispatchList]}>
            <Header classes="header">
                <h1>{props.location.pathname.split('/').pop()}</h1>
            </Header>
            <Main classes="page">
                <List classes="layout mb-5">
                    {decksList.map(elmt => <Deck key={elmt.id} title={elmt.title} infos={elmt.infos} EC={elmt.EC} data={elmt}/>)}
                </List>
                <Plus to="/decks/new-deck"/>
            </Main>
        </DecksContext.Provider>
    )
}

export default DecksPage
