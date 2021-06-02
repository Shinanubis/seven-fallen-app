import React,{useEffect, useState} from 'react'
import DecksContext from '../contexts/DecksContext'
import Plus from '../components/Plus'
import List from '../components/List'
import Deck from '../components/Deck'
import './DecksPage.css'


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
                {
                    decksList.map((elmt, index) => {
                            return(
                                <Deck id={elmt.id} 
                                      title={elmt.deck_name} 
                                      description={elmt.description} 
                                      num_cards={elmt.num_cards} 
                                      total_ec={elmt.total_ec}
                                      listState = {decksList}
                                      listStateSetter = {setDecksList}
                                />)
                        }
                    )}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            </List>
    )
}

export default DecksPage;
