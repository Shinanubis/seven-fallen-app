import React,{useEffect, useState} from 'react';
import {getUserDecks} from '../api/Decks';
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import List from '../components/List';
import Deck from '../components/Deck';


const DecksPage = () => {
    const [decksList, setDecksList] = useState([]);
    const [flashState, setFlashState] = useState(null)

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    useEffect(async () => {

        let response = await getUserDecks();
        setDecksList(response);
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

                <Flash 
                    classes="message__flash" 
                    errorClass="message__flash-error" 
                    successClass="message__flash-success" 
                    message="flash"
                    timing={750}
                    flash={flashState}
                    handleFlash= {handleFlash}
                />
                
                <Plus to={'/decks/new-deck'}/>
              </>
      )
    }

    return (
            <>
                <div className="deck__list">
                    <p className="deck__list--empty">Your deck list is empty</p>
                </div>
                <Plus to={'/decks/new-deck'}/>
            </>
            )
}

export default DecksPage;
