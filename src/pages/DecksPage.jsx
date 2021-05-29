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
    const [list, setList] = useState([]);
    useEffect(async () => {
        const response = await fetch('https://test-seven.site/api/decks',{
            method: 'GET',
            credentials: 'include'
        });
        const datas = await response.json();
        console.log(datas);
        setList(datas);
    },[])

    return (
        <>
            {list.map(elmt => {
                return <li>{elmt.deckname}</li>
            })}
        </>  
    )
}

export default DecksPage;
