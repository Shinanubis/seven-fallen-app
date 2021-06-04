import React,{useEffect, useState} from 'react';
import {getUserDecks} from '../api/Decks';
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import List from '../components/List';
import Deck from '../components/Deck';


const DecksPage = () => {
    const [decksList, setDecksList] = useState([]);
    const [flashState, setFlashState] = useState(null);
    const [deleteResponse, setDeleteResponse] = useState({});

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    const handleDelete = (newState) => {
        setDeleteResponse(newState)
    } 

    useEffect(async () => {
        let response = await getUserDecks();
        if(response.code === 200){
            setDecksList(response.message);
        }else{
            console.log(response)
            setDecksList([])
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
                                            deleteState = {deleteResponse}
                                            deleteStateSetter = {handleDelete}
                                            handleFlash = {handleFlash}
                                      />)
                              }
                          )}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                </List>

                <Flash 
                    classes="message__flash" 
                    errorClass="message__flash-error" 
                    successClass="message__flash-done" 
                    message={deleteResponse.message ? deleteResponse.message : "flash message"}
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
