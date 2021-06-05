import React,{useEffect, useState} from 'react';
import Layout from '../layouts/Layout';
import {getUserDecks} from '../api/Decks';
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import List from '../components/List';
import Deck from '../components/Deck';
import Pagination from '../components/Pagination';


const DecksPage = () => {
    const [decksList, setDecksList] = useState([]);
    const [flashState, setFlashState] = useState(null);
    const [deleteResponse, setDeleteResponse] = useState({});
    const [reqOpt, setReqOpt] = useState({
        page: 1,
        size: 10,
        order_by: 'id',
        sens: 'asc'
    });

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    const handleDelete = (newState) => {
        setDeleteResponse(newState)
    } 

    useEffect(async () => {
        let response = await getUserDecks(reqOpt);
        setDecksList(response);
    },[])

    if(decksList.message && decksList.message instanceof Array){
        return (
            <Layout>
                <List classes="layout layout__1">
                      {
                          decksList.message.map(elmt => {
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
                                            reqOptState = {reqOpt}
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
                <Pagination listSize={[10,20,40]} /> 
                <Plus to={'/decks/new-deck'}/>
              </Layout>
      )
    }
    return (
            <Layout>
                <div className="deck__list">
                    <p className="deck__list--empty">Your deck list is empty</p>
                </div>
                <Plus to={'/decks/new-deck'}/>
            </Layout>
            )
    }


export default DecksPage;
