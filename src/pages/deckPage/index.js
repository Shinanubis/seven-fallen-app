//hooks imports
import {useState, useLayoutEffect, useContext, useEffect, useRef} from 'react';
import {useParams, useHistory} from "react-router-dom";

//components import
import Header from "../../components/heading";
import ToolBox from "../../components/toolbox";
import ListContainer from '../../components/listContainer';
import Popup from '../../components/popup';
import Flash from '../../components/flashMessage';
import {AiOutlinePlusCircle, AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import {BsPencil,BsDownload, BsUpload, BsBarChart} from "react-icons/bs";
import {BiTrashAlt} from 'react-icons/bi';

//datas import
import kingdomsDatas from "../../settings/kingdom";
import {hierarchy} from './settings';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

//utilities imports
import {orderBy, merge, unionBy} from 'lodash';

//services import
import {getOne, deleteUserDeck, updateOne} from "../../api/Decks";

//styles import
import './deckPage.css';

//utils imports
import {difference, debounce} from 'lodash';


function DeckPage(props){
    //contexts
    const [session, setLanguage] = useContext(SessionContext);

    //states
    const [isOpen, setIsOpen] = useState(false);
    const [typeList, setTypeList] = useState()
    const [deck, setDeck] = useState({
        success: {},
        error: {}
    });
    const [flash, setFlash] = useState({
        success: "",
        error: ""
    });
    const [actionPopup, setActionPopup] = useState({
        isOpen: false,
        action: ""
    });

    // hooks
    let {id} = useParams();
    let history = useHistory();

    //refs
    let kingdomRef = useRef();
    let deckNameRef = useRef();

    //handlers
    const handleArrowClick = function(e){
        setIsOpen(!isOpen)
    }

    const handleLoad = (e) => {
        if(e.target.id === 'kingdom'){
            kingdomRef.current.classList.remove('d-none');
        }
    }

    const handleRedirect = (url) => {
        history.push(url)
    }

    const handleInputPopupChange = function(e){
        console.log(e.target.value)
    }
    
    const handleInfosChanges = debounce(async (e) => {
        e.preventDefault();

        let response = "";

        if(e.target.id === "is-hidden" && deck.success.is_visible === false){
            return;
        }

        if(e.target.id === "is-visible" && deck.success.is_visible === true){
            return;
        }

        if(e.target.id === "is-visible" && deck.success.is_visible === false){
            if(deck.success){
                response = await updateOne({...deck.success, is_visible: true}, id);
            }
        }

        if(e.target.id === "deck_name"){
            setActionPopup({
                    isOpen: true,
                    action: 'deck_name'
            })
        }

        if(e.target.id === "is-hidden" && deck.success.is_visible === true){
            if(deck.success){
                response = await updateOne({...deck.success, is_visible: false}, id);
            }
        }

        if(response && response.code === 200){
            return setDeck({
                ...deck,
                success: {
                    ...deck.success,
                    is_visible: response.message[0].is_visible
                }
            })
        }
    },200);

    const handleActions = (e) => {
        e.preventDefault();
        switch(e.target.id){
            case 'import':
                return setActionPopup({
                    isOpen: true,
                    action: 'import'
                })
            case 'export':
                return setActionPopup({
                    isOpen: true,
                    action: 'export'
                })
            case 'delete':
                return setActionPopup({
                    isOpen: true,
                    action: 'delete'
                })
            case 'average':
                return setActionPopup({
                    isOpen: true,
                    action: 'average'
                })
            case 'cancel':
                return setActionPopup({
                    isOpen: false,
                    action: ""
                })
            case 'confirm':
                return setActionPopup({
                    isOpen: false,
                    action: [actionPopup.action, "confirm"]
                })
            default:
                return;
        }
    }

    //effects
    useEffect(async () => {
        let deckResponse = await getOne(id);
        if(deckResponse.code === 200){
            setDeck({...deck, success: deckResponse.message});
        }else{
            setDeck({...deck, error: deckResponse.message});
        }
    }, [])

    useEffect(() => {
        console.log(deck)
    }, [deck])

    useEffect(() => {
        let result = ''
        if(session.types.length > 0){
            //merge objects
            result = orderBy(merge(orderBy(hierarchy, 'id'),orderBy(session.types, 'id')), "order").filter(obj => obj.order !== "");
            let newResult = []
            
            //create new array for rows
            result.map((elmt, index) => {
                if(index > 0 && index < result.length - 1){   
                    if(result[index].order === result[index - 1].order){
                        newResult.push(result[index - 1]);
                        newResult.push(elmt)
                    }     
                }
            });

            //change double value in ""
            newResult.map(rowElmt => {
                result.map((elmt, index) => {
                    if(rowElmt.order === elmt.order){
                        result[index] = "";
                    }
                })
            })

            //unify the same several value in one index
            result = unionBy(result)
            
            //include the row array instead of de "" value
            result.map((elmt, index) => {
                if(elmt === ""){
                    result[index] = newResult;
                }
            })

            setTypeList(result)
        }
    },[session])

    useEffect(async () => {
        let response = "";

        if(actionPopup.action instanceof Array){

            if(difference(actionPopup.action,["delete","confirm"]).length === 0){
                response = await deleteUserDeck(id);
                if(response && response.code === 200){
                    setFlash({
                        ...flash,
                        success: response.message
                    });
                }else{
                    setFlash({
                        ...flash,
                        error: response.message
                    });
                }
            }

            if(difference(actionPopup.action,["export","confirm"]).length === 0){
                console.log(actionPopup.action);
            }

            if(difference(actionPopup.action,["import","confirm"]).length === 0){
                console.log(actionPopup.action);
            }

            if(difference(actionPopup.action,["deck_name","confirm"]).length === 0){
                console.log(deck.success)
                response = await updateOne(deck.success, id);
                if(response && response.code === 200){
                    console.log(response)
                }
            }

        }else if(actionPopup.action === "average"){
            console.log(actionPopup.action);
        }else{
            return;
        }
        
        if(response){
            console.log(response)
        }
    },[actionPopup.action])

    return  (
            <div className="page page__deck container">
                <Popup isOpen={actionPopup.isOpen} onClick={handleActions}>
                    {actionPopup.action === "delete" &&   
                        <>
                            <Popup.Title text="SUPPRIMER"/>
                            <Popup.Text text={`Voulez-vous vraiment supprimer ${deck.success.deck_name} ?`}/>
                            <Popup.Group>
                                <Popup.Button id="confirm" text="confirmer"/>
                                <Popup.Button id="cancel" text="annuler"/>
                            </Popup.Group>
                        </>
                    }
                    {actionPopup.action === 'import' &&   
                        <>
                            <Popup.Title text="IMPORTER"/>
                            <Popup.Text text={`Voulez-vous importer ${deck.success.deck_name} ?`}/>
                            <Popup.Group>
                                <Popup.Button id="confirm" text="confirmer"/>
                                <Popup.Button id="cancel" text="annuler"/>
                            </Popup.Group>
                        </>
                    }
                    {actionPopup.action === 'export' &&   
                        <>
                            <Popup.Title text="EXPORTER"/>
                            <Popup.Text text={`Voulez-vous exporter ${deck.success.deck_name} ?`}/>
                            <Popup.Group>
                                <Popup.Button id="confirm" text="confirmer"/>
                                <Popup.Button id="cancel" text="annuler"/>
                            </Popup.Group>
                        </>
                    }
                    {actionPopup.action === 'average' &&   
                        <>
                            <Popup.Title text="COUT ENERGY CELESTE"/>
                            <Popup.Text text={`Voulez-vous la moyenne de ${deck.success.deck_name} ?`}/>
                            <Popup.Group>
                                <Popup.Button id="confirm" text="confirmer"/>
                                <Popup.Button id="cancel" text="annuler"/>
                            </Popup.Group>
                        </>
                    }
                    {actionPopup.action === 'deck_name' && 
                        <>
                                <Popup.Group>
                                    <input 
                                        className="popup__input--field"
                                        type="text"
                                        placeholder="Entrez le nom"
                                        onChange={handleInputPopupChange}
                                        value={deck.success && deck.success.deck_name} 
                                    />
                                </Popup.Group>
                                <Popup.Group>
                                    <Popup.Button id="confirm" text="ok"/>
                                    <Popup.Button id="cancel" text="annuler"/>
                                </Popup.Group>
                        </>
                    }
                </Popup>
                <Flash 
                    success={flash.success} 
                    error={flash.error} 
                    setFlash={setFlash} 
                    redirect={true}
                    redirectCallback={() => handleRedirect("/decks")} 
                />
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                </Header>
                {deck.success &&
                    <div ref={kingdomRef} className="deck__infos d-none" onLoad={handleLoad} onClick={handleInfosChanges}> 
                        <div className="deck__infos--group">
                            <h2 id="deck_name" className="deck__infos--name">
                                {deck.success.deck_name}
                            </h2>
                            <BsPencil className="deck__infos--icon"/>
                        </div>
                        <div className="deck__infos--group">
                            <div id={`kingdom-${deck.success.kingdom}`} className="deck__infos--kingdom">
                                {deck.success.kingdom && 
                                    <img id="kingdom" 
                                         className="icon" 
                                         src={kingdomsDatas[deck.success.kingdom].icon_url} 
                                         alt="kingdom logo"
                                    />
                                }
                                <BsPencil className="deck__infos--icon"/>
                            </div>
                            <div className="deck__infos--visibility">
                                <AiOutlineEyeInvisible id="is-hidden" className={deck.success.is_visible === false ? "icon is-hidden" : "icon"}/>
                                <AiOutlineEye id="is-visible" className={deck.success.is_visible === true ? "icon is-visible" : "icon"}/>
                            </div>
                        </div>
                    </div>
                }
                {typeList && (
                    <ListContainer>
                        {
                            typeList.map((elmt, index) => {
                                
                                if(elmt instanceof Array){
                                    return (
                                        <ul className="sub__list">
                                            {elmt.map(sub => {
                                                return(
                                                    <li key={sub.name} className="sub__list--item">
                                                        <p className="list__item--text">{sub.name}</p>
                                                        <AiOutlinePlusCircle className="icon"/>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                } 

                                return(
                                        <li key={elmt.order} className="list__item">
                                            <p className="list__item--text">{elmt.name}</p>
                                            <AiOutlinePlusCircle className="icon"/>
                                        </li>
                                    )
                            })
                        }
                    </ListContainer>
                )}
                <ToolBox isOpen={isOpen} onClick={handleActions}>
                    <ToolBox.Top isOpen={isOpen} title="options" onClick={handleArrowClick}/>
                    <ToolBox.Content>
                        <ToolBox.Row>
                            <ToolBox.Action id="import" icon={BsUpload} text="IMPORT"/>
                            <ToolBox.Action id="export" icon={BsDownload} text="EXPORT"/>
                        </ToolBox.Row>
                        <ToolBox.Row>
                            <ToolBox.Action id="average" icon={BsBarChart}/>
                            <ToolBox.Action id="delete" icon={BiTrashAlt}/>
                        </ToolBox.Row>
                    </ToolBox.Content>
                </ToolBox>
            </div>
        )
}

export default DeckPage;