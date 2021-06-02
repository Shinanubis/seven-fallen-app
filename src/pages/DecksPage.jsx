import React,{useEffect, useState} from 'react'
import Plus from '../components/Plus'
import List from '../components/List'
import Deck from '../components/Deck'


const DecksPage = () => {
    const [decksList, setDecksList] = useState([]);

    useEffect(async () => {
        let response = await fetch('https://test-seven.site/api/decks',{
            method: 'GET',
            credentials: 'include'
        });

        if(response.ok){
            let datas = await response.json();
            setDecksList(datas);
        }

    },[])

    if(decksList.length > 0){
        return (
            <>
                <List classes="layout layout__1">
                      {
                          decksList.map(elmt => {
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
                <Plus to={'/decks/new-deck'}/>
              </>
      )
    }

    return (
            <>
                <div className="deck__list">
                    <p className="deck__list--empty">Your deck list is empty</p>
                </div>
                <Plus />
            </>
            )
}

export default DecksPage;
