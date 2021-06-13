import React,{useEffect, useState} from 'react';
import Layout from '../layouts/Layout';
import { getUserDecks, getDecksByKingdoms} from '../api/Decks';
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
            displayed: ['Poseidia', 'Eondra', 'Endless night', 'MetaScience', 'The light\'s temple', 'Celestial purity', 'The saber\'s way'],
            values: [1,2, 3, 4, 5, 6, 7],
            field_name: 'kingdoms',
            type: "checkbox",
            onChange: (e) => {
                setReqOpt(prevState => {
                    let newObject = {...prevState};
                    let newKingdomsArray = null;

                    if(prevState.kingdoms instanceof Array){
                        newKingdomsArray = [...prevState.kingdoms];
                    }
                    
                    if(e.target.checked === true && !newKingdomsArray.includes(e.target.value)) newKingdomsArray.push(e.target.value);

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

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    const handleDelete = (newState) => {
        setDeleteResponse(newState)
    }

    const handleClickFilter = (e, isVisible) => {
        e.preventDefault();
        setFilter(!isVisible);
    } 

    const handlePage = (e, newPage, options) => {
        e.preventDefault();
        
        if(decksList.message.length < (reqOpt.page * reqOpt.size)){
            setReqOpt({...reqOpt, page: 1});
        }
        
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
        setFilter(true);
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
        setReqOpt({
            kingdoms:[],
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
            setDeleteResponse({code: response.code, message: response.message});
            setFlashState(false);
        }else{
            setFlashState(null);
        }
    },[reqOpt]);

    useEffect(async () => {
        let response = await getUserDecks(reqOpt);
        setDecksList(response);
        console.log("hello")
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
                    list = {decksList}
                    options = {reqOpt}
                    containerClasses = "pagination__block my-3 mb-5 row justify-between"
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
                        buttonResetText="Reset"
                        buttonClickText="ok" 
                        actionClose={handleClosePopup}
                        actionReset={handleResetPopup}
                        actionClick={handleClickPopupButton}
                    />}
              </Layout>
      )
    }
    return (
            <Layout>
                <div className="deck__list">
                    <p className="deck__list--empty">{deleteResponse.message}</p>
                </div>
                <Plus to={'/decks/new-deck'}/>
            </Layout>
            )
    }


export default DecksPage;
