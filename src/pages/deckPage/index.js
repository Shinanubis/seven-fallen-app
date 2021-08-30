import {useState, useLayoutEffect, useContext, useEffect, useRef} from 'react';
import {BsDownload} from 'react-icons/bs';
import Header from "../../components/heading";
import ToolBox from "../../components/toolbox";
import kingdomsDatas from "../../settings/kingdom";
import ListContainer from '../../components/listContainer';
import {SessionContext} from '../../contexts/SessionContext';
import {hierarchy} from './settings';
import {orderBy, merge, unionBy} from 'lodash';
import './deckPage.css';
import {AiOutlinePlusCircle, AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import {BsPencil} from "react-icons/bs"
import {getOne} from "../../api/Decks";
import {useParams} from "react-router-dom";


function DeckPage(props){

    const [isOpen, setIsOpen] = useState(false);
    const [session, setLanguage] = useContext(SessionContext);
    const [typeList, setTypeList] = useState()
    const handleArrowClick = function(e){
        setIsOpen(!isOpen)
    }
    const [deck, setDeck] = useState({
        success: {},
        error: {}
    });
    let {id} = useParams();

    let kingdomRef = useRef();

    const handleLoad = (e) => {
        if(e.target.id === 'kingdom'){
            kingdomRef.current.classList.remove('d-none');
        }
    }

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

    return  (
            <div className="page page__deck container">
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
                <ToolBox isOpen={isOpen}>
                    <ToolBox.Top isOpen={isOpen} title="options" onClick={handleArrowClick}/>
                    <ToolBox.Content>
                        <ToolBox.Row>
                            <ToolBox.Action icon={BsDownload}/>
                            <ToolBox.Action icon={BsDownload}/>
                        </ToolBox.Row>
                        <ToolBox.Row>
                            <ToolBox.Action icon={BsDownload}/>
                            <ToolBox.Action icon={BsDownload}/>
                        </ToolBox.Row>
                    </ToolBox.Content>
                </ToolBox>
            </div>
        )
}

export default DeckPage;