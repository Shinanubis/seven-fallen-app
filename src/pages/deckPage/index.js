//hooks imports
import {useState, useContext, useEffect, useRef} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';

//components import
import {AiOutlinePlus, AiOutlineMinus,AiOutlineCloseCircle} from 'react-icons/ai';
import Header from "../../components/heading";
import ToolBox from "../../components/toolbox";
import ListContainer from '../../components/listContainer';
import Popup from '../../components/popup';
import Flash from '../../components/flashMessage';
import InputFile from "../../components/inputFile";
import {AiOutlinePlusCircle, AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import {BsPencil,BsDownload, BsUpload, BsBarChart} from "react-icons/bs";
import {BiTrashAlt} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import Loader from '../../components/Loader';
import {FiLoader} from 'react-icons/fi';
import LineChart from '../../components/chart';

//datas import
import kingdomsDatas from "../../settings/kingdom";
import {hierarchy} from './settings';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

//utilities imports
import debounce from 'lodash/debounce';
import unionBy from 'lodash/unionBy';
import mod from '../../utilities/utils';

//services import
import {
    getOne, 
    deleteUserDeck, 
    updateOne,
    fetchDeckInfos
} from "../../api/Decks";
import {getExport} from "../../api/Export";
import {uploadDeck} from '../../api/Import';
import {getAllCards, updateOneCard} from '../../api/Cards';

//styles import
import './deckPage.css';


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
    const [cardsDisplayed, setCardsDisplayed] = useState({
        pending: false,
        action: '',
        type: '',
        cards: {},
        success: '',
        error: ''
    });
    const [popupInputField, setPopupInputField] = useState("");
    const [popupInputRadioField, setPopupInputRadioField] = useState(deck.success.kingdom);
    const [exportReady, setExportReady] = useState({
        isReady: false,
        datas: ""
    });
    const [inputFile, setInputFile] = useState({
        isReady: false,
        file: "",
        filename:""
    })

    const [cards, setCards] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);

    // hooks
    let {id} = useParams();
    let history = useHistory();
    const {t} = useTranslation();

    //refs
    let kingdomRef = useRef();
    let inputFileRef = useRef();

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
        if(mod.includesAll(["import","confirm"],actionPopup.action)){
            return;
        }
        return history.push(url)
    }

    const handleListAction = debounce((e) => {
        e.stopPropagation();
        const {action, type, id} = e.target.dataset;
        if(action && type && id){
            switch(action){
                case 'close':
                    return setCardsDisplayed(prevState => {
                        let newObj = {...prevState};
                        delete newObj.cards[type][id];
                        if(newObj.cards[type] && Object.keys(newObj.cards[type]).length === 0){
                            delete newObj.cards[type];
                        }
                        newObj.type = type;
                        newObj.action = action;
                        newObj.pending = true;
                        return {...newObj};
                    });

                case 'plus':
                    return setCardsDisplayed(prevState => {
                        let newObj = {...prevState};
                        if(newObj.cards[type][id].qty === newObj.cards[type][id].max){
                            return {
                                ...prevState,
                                pending: false,
                                action: ''
                            };
                        }
                        newObj.action = action;
                        newObj.pending = true;
                        newObj.cards[type][id].qty = (Number(newObj.cards[type][id].qty) + 1) + '';
                        newObj.type = type;
                        return {...newObj};
                    });

                case 'minus':
                    return setCardsDisplayed(prevState => {
                        let newObj = {...prevState};
                        let previousQty = Number(newObj.cards[type][id].qty);
                        newObj.action = action;
                        newObj.cards[type][id].qty = previousQty !== 1 ? (Number(newObj.cards[type][id].qty) - 1) + '' : 1;
                        newObj.pending = (previousQty !== newObj.cards[type][id].qty && newObj.cards[type][id].qty > 0);
                        newObj.type = type;
                        return {...newObj};
                    });

                default :
                    return setCardsDisplayed({
                        ...cardsDisplayed
                    })
            }
        }
    }, 200)

    const handleFile = (e) => {
        const FILE_FIELDS_ALLOWED = ["eden", "holy_book", "register"];
        let reader = new FileReader();
        let testSet = [
            mod.checkFileSize(e.target.files[0].size, 5000),
            mod.checkFileExt(e.target.files[0].name, "json"),
            mod.checkMimeType(e.target.files[0].type, "application/json")
        ]

        if(mod.testList(testSet) === true){
            reader.addEventListener('load', function(evt) {
                try{
                    //check if the json content is compliant
                    if(mod.isJson(evt.target.result) === false){
                        throw new Error({
                            ...inputFile,
                            isReady: false,
                            file: "",
                            filename: ""
                        })
                    }

                    let readerResult = JSON.parse(evt.target.result);

                    //check tables lentght inside eden, holy_book, register
                    let testTablesLength = Object.keys(readerResult).map(elmt => readerResult[elmt]
                                                                                 .map(elmt => {
                                                                                     if(elmt.length === 0){
                                                                                         return true;
                                                                                     }
                                                                                     return elmt.length === 3
                                                                                 })
                                                                                .every(elmt => elmt === true)
                                                                        )
                                                                    .every(elmt => elmt === true)
                    if(
                        mod.includesAll(FILE_FIELDS_ALLOWED, Object.keys(readerResult)) &&
                        testTablesLength === true
                    ){
                        setInputFile({
                            ...inputFile,
                            isReady: true,
                            file: e.target.files[0],
                            filename: e.target.files[0].name
                        })
                    } 
                }catch(err){
                    setInputFile(err)
                }
            })
        }else{
            setInputFile({
                ...inputFile,
                isReady: false,
                file: "",
                filename: ""
            })
        }

        reader.readAsText(e.target.files[0]);
    };

    const handleInputPopupChange = debounce(function(text){
        setPopupInputField(text);
    }, 300);

    const handleInputRadioChange = function(e){
        setDeck({...deck, success: {...deck.success, kingdom: e.target.id}})
        setPopupInputRadioField(e.target.value);
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

        if(e.target.id === "kingdom"){
            setActionPopup({
                isOpen: true,
                action: "kingdom"
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
            case 'download': 
                return setActionPopup({
                    isOpen: true,
                    action: [actionPopup.action, "download"]
                })
            case 'cancel':
                setIsOpen(false);
                setExportReady({
                    isReady: false,
                    datas: ""
                });
                setInputFile({
                    isReady: false,
                    file: "",
                    filename:""
                });
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

    const handleExport = function(e, datasToExport, callback, elmtToClick){
        e.preventDefault();
        e.stopPropagation();
        return callback(datasToExport, elmtToClick);
    }

    //effects
    useEffect(() => {
        async function fetchOneDeck(){
            let cardsResponse = '';
            let deckResponse = await getOne(id);
            let responseCards = await getExport(id);
            let cards = [].concat(responseCards.message.eden, responseCards.message.holy_book, responseCards.message.register)
                          .map(elmt => elmt[0]);

            if(deckResponse.code === 200){
                cardsResponse = await getAllCards(id);
                if(cardsResponse.code === 200){
                    setCardsDisplayed({
                        ...cardsDisplayed,
                        pending: false,
                        cards: {...cardsResponse.message}
                    });
                }
                setCards([...cards]);
                setDeck({...deck, success: deckResponse.message});
            }else{
                setDeck({...deck, error: deckResponse.message});
            }
        }
        fetchOneDeck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        /* set the object in order to make a ordered list */ 
        let result = ''
        if(session.types.length > 0){

            //merge objects
            result = mod.mergeAndOrder(hierarchy, session.types, 'id', 'order')
                        .filter(obj => obj.order !== "");
            
            //create new array for rows
            let newResult = mod.rowMakerBy(result, 'order');

            //chage double value in ""
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

            if(mod.includesAll(["delete","confirm"],actionPopup.action)){
                response = await deleteUserDeck(id);
                if(response && response.code === 200){
                    return setFlash({
                        ...flash,
                        success: response.message
                    });
                }
            }

            if(mod.includesAll(["export","download"],actionPopup.action)){
                response = await getExport(id);
                if(response && response.code === 200){
                    if(response.message instanceof Array && response.message.length === 0){
                        return setExportReady({
                            ...exportReady,
                            isReady: true,
                            datas: ""
                        });
                    }
                    return setExportReady({
                        ...exportReady,
                        isReady: true,
                        datas: response.message
                    });
                } 
            }

            if(mod.includesAll(["import","confirm"],actionPopup.action)){
                response = await uploadDeck({id, file: inputFile.file});
                setIsOpen(false)
                if(response && response.code === 200){
                        setInputFile({
                            isReady: false,
                            file: "",
                            filename: ""
                        });
                        setFlash({
                            ...flash,
                            success: t("flash.import.success", {name: deck.success.deck_name})
                        })
                        return setDeck({
                            ...deck,
                            success: response.message[0]
                        })
                }
                setInputFile({
                    isReady: false,
                    file: "",
                    filename: ""
                });
                setFlash({
                    ...flash,
                    error: response.message
                })
            }

            if(mod.includesAll(["kingdom", "confirm"],actionPopup.action)){
                response = await updateOne({...deck.success}, id);
                if(response && response.code === 200){
                    return setDeck({
                        ...deck,
                        success:{
                            ...deck.success,
                            kingdom: response.message[0].kingdom
                        }
                    })
                }
            }

            if(mod.includesAll(["deck_name","confirm"],actionPopup.action)){
                response = await updateOne({...deck.success, deck_name: popupInputField}, id);
                if(response && response.code === 200){
                    return setDeck({
                        ...deck,
                        success: {
                            ...deck.success,
                            deck_name: response.message[0].deck_name
                        }
                    })
                }
            }

        }else if(actionPopup.action === "average"){
            return console.log(actionPopup.action);
        }else{
            return;
        }

        if(response && response.code !== 200){
            return setFlash({
                ...flash,
                error: response.message
            });
        }
        
    },[actionPopup.action]);

    useEffect(() => {
        async function updateCardsAndDeck(){
            await updateOneCard(id, cardsDisplayed.type, setCardsDisplayed, cardsDisplayed);
            await fetchDeckInfos(id, deck, setDeck);
        }
        if(cardsDisplayed.pending){
            updateCardsAndDeck();
        }
    },[cardsDisplayed.pending])

    useEffect(() => {
        if(!pageLoaded && 
            cardsDisplayed && 
            typeList &&
            (Object.keys(deck.success).length >= 1 || Object.keys(deck.error).length >= 1)
        ){
            setPageLoaded(true);
        }
    },[
        JSON.stringify(cardsDisplayed), 
        JSON.stringify(typeList),
        JSON.stringify(deck.success),
        JSON.stringify(deck.error)
    ])

    useEffect(() => {
        console.log(cardsDisplayed)
    },[cardsDisplayed])

    return(pageLoaded ?
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
                            
                            {!inputFile.filename &&
                            <InputFile 
                                ref={inputFileRef} 
                                id="file" 
                                onChange={handleFile} 
                                text="Choisissez un fichier à importer ..."
                                className = "input__file d-none"
                                accept="application/json" 
                            />
                            }
                            {inputFile.filename && 
                                <Popup.Group>
                                    <p className="input__file--filename">{inputFile.filename}</p>
                                </Popup.Group>
                            }
                            <Popup.Group>                                
                                {inputFile.isReady && <Popup.Button id="confirm" text="confirmer"/>}
                                <Popup.Button id="cancel" text="annuler"/>
                            </Popup.Group>
                        </>
                    }
                    {(
                        actionPopup.action === 'export' || 
                        mod.includesAll(['export','download'], actionPopup.action)
                     )&&   
                        <>
                            <Popup.Title text="EXPORTER"/>
                            {
                                (exportReady.isReady === true && !exportReady.datas) &&
                                    <Popup.Text text={`${deck.success.deck_name} is empty`}/>                              
                            }
                            {
                                (exportReady.isReady === true && exportReady.datas) &&
                                    <Popup.Text text={`${deck.success.deck_name} is ready`}/>
                            }
                            {
                                (exportReady.isReady === false  && !exportReady.datas) &&
                                    <Popup.Text text={`Voulez vous exporter ${deck.success.deck_name} ?`}/>
                            }
                            <Popup.Group>
                                {(
                                    mod.includesAll(['export','download'], actionPopup.action) &&
                                    exportReady.isReady === true
                                 )
                                    ?
                                    exportReady.datas && 
                                        <Popup.Button 
                                            id="ready" 
                                            text="ready" 
                                            onClick={(e) => handleExport(e, exportReady.datas, mod.exportToFile, document.getElementById('cancel'))}
                                        />
                                    :
                                    <Popup.Button 
                                        id="download" 
                                        text={t("download")}
                                    />
                                }
                                <Popup.Button id="cancel" text={t("cancel")}/>
                            </Popup.Group>
                        </>
                    }
                    {actionPopup.action === 'average' &&   
                        <>
                            <Popup.Title text="COUT ENERGY CELESTE"/>
                            <LineChart />
                        </>
                    }
                    {actionPopup.action === 'deck_name' && 
                        <>
                                <Popup.Group>
                                    <Popup.InputText
                                        placeholder="Entrez le nom"
                                        onChange = {handleInputPopupChange}
                                    />
                                </Popup.Group>
                                <Popup.Group>
                                    <Popup.Button id="confirm" text="confirmer"/>
                                    <Popup.Button id="cancel" text="annuler"/>
                                </Popup.Group>
                        </>
                    }
                    {actionPopup.action === 'kingdom' && 
                        <form className="popup__form" onChange={handleInputRadioChange}>
                                {session.kingdoms &&
                                    session.kingdoms.map(elmt => {
                                        return (
                                            <Popup.Group classes="popup__group radio">
                                                <div className="popup__inner--group">
                                                    <Popup.Label htmlFor={elmt.id}>
                                                        <img className="icon" 
                                                             src={kingdomsDatas[elmt.id].icon_url}
                                                             alt="kingdom logo"
                                                        />
                                                        <p className="popup__label--text">{elmt.name}</p>
                                                    </Popup.Label>
                                                    {elmt.id === deck.success.kingdom ?
                                                        <Popup.InputRadio 
                                                                id={elmt.id} 
                                                                name="kingdom" 
                                                                value={elmt.id}
                                                                checked={elmt.id === deck.success.kingdom} 
                                                        />
                                                        :
                                                        <Popup.InputRadio 
                                                                id={elmt.id} 
                                                                name="kingdom" 
                                                                value={elmt.id}
                                                        />
                                                    }
                                                </div>
                                            </Popup.Group>
                                        )
                                    })
                                }
                                <Popup.Group>
                                    <Popup.Button id="confirm" text="confirmer"/>
                                    <Popup.Button id="cancel" text="annuler"/>
                                </Popup.Group>
                        </form>
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
                    <p className="header__text">
                        Livre Sacré {deck.success.holyBookQty}
                    </p>
                </Header>
                {typeList && 
                    <ListContainer >
                    {deck.success && 
                        <div ref={kingdomRef} className="deck__infos d-none" onLoad={handleLoad} onClick={handleInfosChanges}> 
                            <div id="deck_name" className="deck__infos--group">
                                <p className="deck__infos--text">
                                    {deck.success.deck_name}
                                </p>
                                <BsPencil className="deck__infos--icon"/>
                            </div>
                            <div className="deck__infos--group">
                                <div id="kingdom" className="deck__infos--kingdom">
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
                                    <AiOutlineEyeInvisible 
                                        id="is-hidden" 
                                        className={deck.success.is_visible === false ? "icon is-hidden" : "icon"}
                                    />
                                    <AiOutlineEye 
                                        id="is-visible" 
                                        className={deck.success.is_visible === true ? "icon is-visible" : "icon"}
                                    />
                                </div>
                            </div>
                        </div>
                        }
                        <ul className="list" onClick={handleListAction} >
                        {typeList.map((elmt, index) => {
                                if(elmt instanceof Array){
                                    return (
                                        <ul className="sub__list">
                                            {elmt.map(sub => {
                                                return(
                                                    <li key={sub.name} className="sub__list--item">
                                                        <p 
                                                            className="list__item--text"
                                                        >
                                                            {`${sub.name} `}
                                                            {cardsDisplayed.cards[sub.id] && 
                                                                <span>{
                                                                    Object.values(cardsDisplayed.cards[sub.id])
                                                                          .reduce((prev, curr) => Number(prev) + Number(curr.qty), 0)
                                                                    }
                                                                </span>
                                                            }
                                                        </p>
                                                        <Link to={`/decks/${id}/cards/${sub.id}`}>
                                                            <AiOutlinePlusCircle className="icon"/>
                                                        </Link>
                                                        {cardsDisplayed.cards[sub.id] && 
                                                        <ul className="inner__list">
                                                           {Object.keys(cardsDisplayed.cards[sub.id]).map(cardId => {
                                                               return (
                                                                   <li key={cardId} 
                                                                       className="inner__list--item special"
                                                                    >
                                                                        <img src={cardsDisplayed.cards[sub.id][cardId].image_path} alt="7 fallen image" />        
                                                                            <div className="counter__box">
                                                                            {Number(cardsDisplayed.cards[sub.id][cardId].max) > 1 &&
                                                                                <>
                                                                                    <AiOutlineMinus 
                                                                                        className="counter__box--minus" 
                                                                                        data-action="minus" 
                                                                                        data-type={sub.id}
                                                                                        data-id = {cardId}
                                                                                    />
                                                                                    <span className="counter__num">{cardsDisplayed.cards[sub.id][cardId].qty}</span>
                                                                                    <AiOutlinePlus 
                                                                                        className="counter__box--plus" 
                                                                                        data-action="plus" 
                                                                                        data-type={sub.id}
                                                                                        data-id = {cardId}
                                                                                    />
                                                                                </>
                                                                            }
                                                                                <AiOutlineCloseCircle 
                                                                                    className="counter__box--close" 
                                                                                    data-action="close" 
                                                                                    data-type={sub.id}
                                                                                    data-id = {cardId}
                                                                                />
                                                                            </div>
                                                                        
                                                                   </li>
                                                               )
                                                           })} 
                                                        </ul>
                                                        }
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                } 

                                return(
                                        <>
                                            <li key={elmt.order} className="list__item">
                                                <p 
                                                    className="list__item--text"
                                                >
                                                    {`${elmt.name} `}
                                                    {cardsDisplayed.cards[elmt.id] && 
                                                        <span>{
                                                                Object.values(cardsDisplayed.cards[elmt.id]).reduce((prev, curr) => 
                                                                    Number(prev) + Number(curr.qty), 0
                                                                )
                                                            }
                                                        </span>
                                                    }
                                                </p>
                                                <Link to={`/decks/${id}/cards/${elmt.id}`}><AiOutlinePlusCircle className="icon"/></Link>
                                                {cardsDisplayed.cards[elmt.id] && 
                                                <ul className="inner__list">
                                                   {Object.keys(cardsDisplayed.cards[elmt.id]).map(cardId => {
                                                       return (
                                                           <li key={cardId} 
                                                               className={elmt.id !== 1 ? 
                                                                   "inner__list--item" 
                                                                   : 
                                                                   "inner__list--item divinity"
                                                                }
                                                            >
                                                                <img src={cardsDisplayed.cards[elmt.id][cardId].image_path} alt="7 fallen image" />
                                                                <div className={elmt.id !== 1 ? "counter__box" : "counter__box divinity"}>
                                                                    {(elmt.id !== 1 &&
                                                                     Number(cardsDisplayed.cards[elmt.id][cardId].max) > 1) &&
                                                                        <>
                                                                            <AiOutlineMinus 
                                                                                className="counter__box--minus" 
                                                                                data-action="minus" 
                                                                                data-type={elmt.id}
                                                                                data-id = {cardId}
                                                                            />
                                                                            <span className="counter__num">{cardsDisplayed.cards[elmt.id][cardId].qty}</span>
                                                                            <AiOutlinePlus 
                                                                                className="counter__box--plus" 
                                                                                data-action="plus" 
                                                                                data-type={elmt.id}                                                                               data-type={elmt.id}
                                                                                data-id = {cardId}
                                                                            />
                                                                        </>
                                                                    }
                                                                    <AiOutlineCloseCircle 
                                                                        className="counter__box--close" 
                                                                        data-action="close" 
                                                                        data-type={elmt.id}
                                                                        data-id = {cardId}
                                                                    />
                                                                </div>
                                                           </li>
                                                       )
                                                   })} 
                                                </ul>
                                                }
                                            </li>
                                        </>
                                    )
                            })
                        }
                    </ul>
                    </ListContainer>
                }
                <ToolBox isOpen={isOpen} onClick={handleActions}>
                    <ToolBox.Top isOpen={isOpen} title="options" onClick={handleArrowClick}/>
                    <ToolBox.Content>
                        <ToolBox.Row>
                            <ToolBox.Action id="import" icon={BsUpload} text={t("import")}/>
                            <ToolBox.Action id="export" icon={BsDownload} text={t("export")}/>
                        </ToolBox.Row>
                        <ToolBox.Row>
                            <ToolBox.Action id="average" icon={BsBarChart}/>
                            <ToolBox.Action id="delete" icon={BiTrashAlt}/>
                        </ToolBox.Row>
                    </ToolBox.Content>
                </ToolBox>
            </div>
            :
            <Loader loaderIcon={FiLoader}/>
        )
}

export default DeckPage;