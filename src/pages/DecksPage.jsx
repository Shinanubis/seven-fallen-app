import React,{useEffect, useState} from 'react';
import Layout from '../layouts/Layout';
import { getUserDecks } from '../api/Decks';
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

    const handlePage = (e, newPage) => {
        e.preventDefault();
        if(newPage <= 0){
            setReqOpt({...reqOpt, page: 1});
        }else{
            setReqOpt({...reqOpt, page: newPage});
        }
    }

    const handleSize = (e, newSize) => {
        e.preventDefault();
        setReqOpt({...reqOpt, size: newSize});
    }

    useEffect(async () => {
        let response = {};
        if(decksList.message instanceof Array && decksList.message.length >= 1){
            response = await getUserDecks(reqOpt);
        }
        if(response.code === 200){
            setDecksList(response);
        }else if(response.code !== 200 && decksList.message instanceof Array){
            setDeleteResponse({code: response.code, message: "This page doesn't exist"});
            setFlashState(false);
            setReqOpt({...reqOpt, page: 1})
        }else{
            setFlashState(null);
        }
    },[reqOpt]);

    useEffect(async () => {
        let response = await getUserDecks(reqOpt);
        setDecksList(response);    
    },[]);

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
                <Pagination 
                    options = {reqOpt}
                    containerClasses = "pagination__block my-3 mb-5 row justify-between"
                    containerTextBlockClasses = {"pagination__text--block row justify-between"} 
                    setPage={handlePage} 
                    setSize={handleSize} 
                    listSize={[10,20,40]} 
                /> 
                <Plus to={'/decks/new-deck'}/>
              </Layout>
      )
    }
    return (
            <Layout>
                <div className="deck__list">
                    <p className="deck__list--empty">Your deck list is empty</p>
                </div>
                <Pagination 
                    options = {reqOpt}
                    containerClasses = "pagination__block my-3 mb-5 row justify-between"
                    containerTextBlockClasses = {"pagination__text--block row justify-between"} 
                    setPage={handlePage} 
                    setSize={handleSize} 
                    listSize={[10,20,40]} 
                /> 
                <Plus to={'/decks/new-deck'}/>
            </Layout>
            )
    }


export default DecksPage;
