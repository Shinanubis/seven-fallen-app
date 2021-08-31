//hooks imports
import {useState, useLayoutEffect, useContext, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";

//components import
import Header from "../../components/heading";
import ToolBox from "../../components/toolbox";
import ListContainer from '../../components/listContainer';
import Popup from '../../components/popup';
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
import {getOne, deleteUserDeck} from "../../api/Decks";

//styles import
import './deckPage.css';

//utils imports
import {difference} from 'lodash';


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
    const [actionPopup, setActionPopup] = useState({
        isOpen: false,
        action: ""
    });

    // url params
    let {id} = useParams();

    //refs
    let kingdomRef = useRef();

    //handlers
    const handleArrowClick = function(e){
        setIsOpen(!isOpen)
    }

    const handleLoad = (e) => {
        if(e.target.id === 'kingdom'){
            kingdomRef.current.classList.remove('d-none');
        }
    }

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
            setDeck({...deck, success: deckResponse.message})
        }else{
            setDeck({...deck, error: deckResponse.message})
        }
    }, [])

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
                response = deleteUserDeck(id);
                console.log(response)
            }

            if(difference(actionPopup.action,["export","confirm"]).length === 0){
                console.log(actionPopup.action )
            }

            if(difference(actionPopup.action,["import","confirm"]).length === 0){
                console.log(actionPopup.action )
            }

        }else if(actionPopup.action === "average"){
            console.log(actionPopup.action)
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
                </Popup>
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                </Header>
                {deck.success &&
                    <div ref={kingdomRef} className="deck__infos d-none" onLoad={handleLoad}> 
                        <div className="deck__infos--group">
                            <h2 className="deck__infos--name">
                                {deck.success.deck_name}
                            </h2>
                            <BsPencil className="deck__infos--icon"/>
                        </div>
                        <div className="deck__infos--group">
                            <div className="deck__infos--kingdom">
                                {deck.success.kingdom && <img id="kingdom" className="icon" src={kingdomsDatas[deck.success.kingdom].icon_url} alt="kingdom logo"/>}
                                <BsPencil className="deck__infos--icon"/>
                            </div>
                            <div className="deck__infos--visibility">
                                <AiOutlineEyeInvisible className="icon is-visible"/>
                                <AiOutlineEye className="icon is-hidden"/>
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