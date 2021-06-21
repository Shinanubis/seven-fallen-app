import React,{useEffect, useState, useLayoutEffect} from 'react';

/* layout */
import Layout from '../layouts/Layout';

/* api */
import { getUserDecks, getDecksByKingdoms} from '../api/Decks';

/* components */
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import List from '../components/List';
import Deck from '../components/Deck';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import Popup from '../components/Popup';
import { Redirect } from 'react-router-dom';

const DecksPage = () => {

    const [decksList, setDecksList] = useState({
        code: 200,
        message: []
    });
    const [flashState, setFlashState] = useState(null);
    const [deleteResponse, setDeleteResponse] = useState({});
    const [filterClicked, setFilter] = useState(true);
    const [reqOpt, setReqOpt] = useState({
        kingdoms: [],
        mode: '',
        page: 1,
        size: 10,
        order_by: 'id',
        sens: 'asc'
    });

    const [checkboxes, setCheckBoxes] = useState([false, false, false, false,false,false,false]);

    /* datas for popup form */
    const popupDatas = {
        "List by kingdoms": {
            displayed: ['Poseidia', 'Eondra', 'Endless night', 'MetaScience', 'The light\'s temple', 'Celestial purity', 'The saber\'s way'],
            values: [1, 2, 3, 4, 5, 6, 7],
            field_name: 'kingdoms',
            type: "checkbox",
            onChange: (e) => {
                setReqOpt(prevState => {
                    let newObject = {...prevState};
                    let newKingdomsArray = null;

                    if(prevState.kingdoms instanceof Array){
                        newKingdomsArray = [...prevState.kingdoms];
                    }

                    if(e.target.checked === true && !newKingdomsArray.includes(e.target.value)){ 
                        newKingdomsArray.push(e.target.value)
                    };

                    if(e.target.checked === false) {
                        let index = newKingdomsArray.indexOf(e.target.value);
                        if(index > -1){
                            newKingdomsArray.splice(index, 1);
                        }
                    }

                    newObject.kingdoms = newKingdomsArray;
                    newObject.order_by = 'kingdom'
                    return newObject;
                });
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

    /* handle flash messages */
    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    const handleDelete = (newState) => {
        setDeleteResponse(newState)
    }

    /* handling fucntion for filter */
    const handleClickFilter = (e, isVisible) => {
        e.preventDefault();
        setFilter(!isVisible);
    } 

    /* handling functions for pagination */
    const handlePage = async (e, newPage, options) => {
        e.preventDefault();
        if(newPage <= 0){
            return;
        }else{
            setReqOpt({...options, page: newPage});  
        }             
    }

    const handleSize = (e, newSize) => {
        e.preventDefault();
        setReqOpt({...reqOpt, size: newSize});
    }

    /* handling functions for popup */
    const handleSelectPopup = (e) => {
        e.preventDefault();

        if(e.target.value === 'unique'){
            setReqOpt({...reqOpt, mode: 'unique'});
        }

        if(e.target.value === 'combination'){
            setReqOpt({...reqOpt, mode:'combination'});
        }

        if(e.target.value === ''){
            setReqOpt({...reqOpt, mode:''});
        }
    }

    const handleClosePopup = (e) => {
        e.preventDefault();
        setFilter(true);
    }

    const handleResetPopup = (e) => {
        setReqOpt({
            kingdoms:[],
            mode:'',
            page: 1,
            size: 10,
            order_by: 'id',
            sens: 'asc'
        });
        setFilter(true);
    }

    useEffect(async () => {
        let response = null;
        
        if(reqOpt.kingdoms.length > 0){
            response = await getDecksByKingdoms(reqOpt);
        }else{
            response = await getUserDecks(reqOpt);
        }

        if(response.code === 200){
            setDecksList(response);
        }else if(response.code !== 200 && decksList.message instanceof Array){
            setDecksList([]);
            setDeleteResponse(response);
            setFlashState(true);
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
                <Filters containerClasses="filter__container row justify-end my-3" isVisible={filterClicked} onClick={handleClickFilter}/>
                <List classes="list__content layout layout__1">
                      { 
                        decksList.message.length > 0 ?
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
                          ) : 
                        <p style ={{color: "black",marginTop:"auto",marginBottom:"auto"}}>
                            Empty 
                        </p>

                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
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
                    eventsToListen = {filterClicked}
                    containerClasses = "pagination__block my-3 mb-5 row justify-between"
                    containerTextBlockClasses = {"pagination__text--block row justify-between"} 
                    setPage={handlePage} 
                    setSize={handleSize} 
                    listSize={[10,20,40]}
                    nextPage={reqOpt.kingdoms.length > 0 ? getDecksByKingdoms : getUserDecks}
                />
                <Plus to={'/decks/new-deck'}/>
                {
                    filterClicked || 
                        <Popup
                            mode = {reqOpt.mode}
                            setOptions = {setReqOpt}
                            datas={popupDatas}  
                            buttonResetText="Reset"
                            checkboxesState = {checkboxes}
                            setCheckBoxes = {setCheckBoxes}
                            actionSelect = {handleSelectPopup}
                            actionClose={handleClosePopup}
                            actionReset={handleResetPopup}
                        />
                }
              </Layout>
      )
    }else{
        return (<Redirect to="/decks/not-found"/>);
    }
}


export default DecksPage;
