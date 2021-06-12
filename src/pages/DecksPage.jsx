import React,{useEffect, useState} from 'react';
import Layout from '../layouts/Layout';
import { getUserDecks } from '../api/Decks';
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import List from '../components/List';
import Deck from '../components/Deck';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import  Popup from '../components/Popup';


const DecksPage = () => {

    const [decksList, setDecksList] = useState([]);
    const [flashState, setFlashState] = useState(null);
    const [deleteResponse, setDeleteResponse] = useState({});
    const [filterClicked, setFilter] = useState(true);
    const [reqOpt, setReqOpt] = useState({
        kingdoms: [],
        page: 1,
        size: 10,
        order_by: 'id',
        sens: 'asc'
    });

    const popupDatas = {
        "List by kingdoms": {
            displayed: ['Poseidia', 'Eondra', 'Nuit sans fin', 'MetaScience', 'Temple de la lumière', 'Pureté Céleste', 'La voie'],
            values: [1,2, 3, 4, 5, 6, 7],
            field_name: 'kingdoms[]',
            type: "checkbox",
            onChange: (e) => {
                setReqOpt(prevState => ([...prevState.kingdoms, e.target.value]));
            }
        },
        "Order by": {
            displayed: ['Deck name' ,'Kingdom' ,'Total ec' , 'Num cards'],           
            values: ['deck_name' ,'kingdom' ,'total_ec' , 'num_cards'],
            type: "radio",
            field_name: "order_by",
            onChange: (e) => {
                setReqOpt({...reqOpt, order_by: e.target.value});
            }
        },
        "Sens": {
            displayed: ["Descendant"],
            values: ["desc"],
            type: "radio",
            field_name: "sens",
            onChange: (e) => {
                setReqOpt({...reqOpt, sens: e.target.value});
            }
        }
    }

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    const handleDelete = (newState) => {
        setDeleteResponse(newState)
    }

    const handleClickFilter = (e, isVisible) => {
        e.preventDefault();
        if(isVisible === true){
            setFilter(false);
        }
        
        if(isVisible === false){
            setFilter(true);
        }
    } 

    const handlePage = (e, newPage, options) => {
        e.preventDefault();
        if(newPage <= 0){
            setReqOpt({...options, page: 1});
        }else{
            setReqOpt({...options, page: newPage});
        }
    }

    const handleSize = (e, newSize) => {
        e.preventDefault();
        setReqOpt({...reqOpt, size: newSize});
    }

    const handleClickPopupButton = (e) => {
        e.preventDefault();
    }

    const handleClickPopupOptions = (e) => {
        e.preventDefault();
        setReqOpt({...reqOpt, order_by: e.target.value});
    }

    const handleClosePopup = (e) => {
        e.preventDefault();
        setFilter(true);
    }

    const handleResetPopup = (e) => {
        e.preventDefault();
        setReqOpt({
            kingdom: [],
            page: 1,
            size: 10,
            order_by: 'id',
            sens: 'asc'
        });
    }

    useEffect(async () => {
        let response = await getUserDecks(reqOpt);
        if(response.code === 200){
            setDecksList(response);
        }else if(response.code !== 200 && decksList.message instanceof Array){
            setDeleteResponse({code: response.code, message: "This page doesn't exist"});
            setFlashState(false);
            setReqOpt({...reqOpt, page: 1})
        }else{
            setFlashState(null);
        }
        console.log(reqOpt);
    },[reqOpt]);

    useEffect(async () => {
        let response = await getUserDecks(reqOpt);
        setDecksList(response);
    },[]);

    if(decksList.message && decksList.message instanceof Array){
        return (
            <Layout>
                <Filters containerClasses="filter__container row justify-end my-3" isVisible={filterClicked} onClick={handleClickFilter}/>
                <List classes="list__content layout layout__1">
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
                    containerClasses = "pagination__block my-3 row justify-between"
                    containerTextBlockClasses = {"pagination__text--block row justify-between"} 
                    setPage={handlePage} 
                    setSize={handleSize} 
                    listSize={[10,20,40]} 
                /> 
                <Plus to={'/decks/new-deck'}/>
                {filterClicked || 
                    <Popup 
                        datas={popupDatas} 
                        onClickButton = {handleClickPopupButton}
                        onClickOptions = {handleClickPopupOptions} 
                        buttonText="Reset" 
                        actionClose={handleClosePopup}
                        actionReset={handleResetPopup}
                    />}
              </Layout>
      )
    }
    return (
            <Layout>
                <div className="deck__list">
                    <p className="deck__list--empty">Your deck list is empty</p>
                </div>
                <Pagination 
                    list = {decksList}
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
