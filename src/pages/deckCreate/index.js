//hooks
import {useState, useEffect, useContext} from 'react'
import {useTranslation} from 'react-i18next';
import useOrderBy from '../../hooks/useOrderBy';
import {useHistory} from 'react-router-dom';

/*components*/
import CreateDeckForm from "../../components/createDeckForm";
import Header from '../../components/heading';
import {GrCaretDown} from 'react-icons/gr';
import Logo from '../../img/logos/7-fallen-logo-2.png';
import Flash from "../../components/flashMessage";

/*style*/
import './DeckCreate.css';

/*service*/
import {createUserDeck} from '../../api/Decks';

/*contexts*/
import {SessionContext} from '../../contexts/SessionContext';

/*setting*/
import kingdomsDatas from '../../settings/kingdom.js';


function DeckCreate(props){

    //states
    const [flashIsVisible, setFlashIsVisible] = useState({
        success: "",
        error: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [datas, setDatas] = useState({
        name:"",
        kingdom: 0
    });
    const [dropdownTitle, setDropdownTitle] = useState("")

    //hooks
    const {t} = useTranslation();
    const [session, setLanguage] = useContext(SessionContext);
    let history = useHistory();

    //replace french name by aother language
    let orderedKingdoms = useOrderBy(session.kingdoms, 'name', 'asc');

    //handlers
    const handleRedirect = (url) => {
        if(url){
            return history.push(url);
        }
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("deck_name", datas.name.trim());
        form.append("kingdom", datas.kingdom);
        let responseCreate = "" 
        
        if(datas.kingdom === 0 || !datas.name){
            return setFlashIsVisible(
                {...flashIsVisible,
                 error: `${t("flash.empty",{names: `Deck, ${t("kingdom")}`})}`,
                 success: "" 
                }
            )
        }else{
            responseCreate = await createUserDeck(form);
        }
        
        if(responseCreate && responseCreate.code == 200){
            console.log(responseCreate)
            return setFlashIsVisible({
                        ...flashIsVisible, 
                        success: t("flash.success", {name: responseCreate.message[0].deck_name}), 
                        error:""
                    });
        }else if(responseCreate && responseCreate.code == 409){
            let name = responseCreate.message.split(' ')[0];
            return setFlashIsVisible({
                        ...flashIsVisible, 
                        error: t("flash.already",{name}), 
                        success:""
                    });
        }else if(responseCreate && responseCreate.code == 400){
            return setFlashIsVisible({
                        ...flashIsVisible, 
                        error: t(`flash.${responseCreate.message}`), 
                        success:""
                    });
        }else if(responseCreate && responseCreate.code == 403){
            return setFlashIsVisible({
                ...flashIsVisible, 
                error: t(`flash.${responseCreate.message}`), 
                success:""
            });
        }else {   
            return setFlashIsVisible({
                ...flashIsVisible, 
                error: t("flash.internal"), 
                success:""
            });
        }
        
    }

    const handleChoice = (e) => {
        setDropdownTitle(e.target.textContent);
        setDatas({...datas, kingdom: e.target.id});
        setIsOpen(false)
    }

    return (
        <div className="decks create container">
            <Header>
                <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
            </Header>
            <Flash 
                success={flashIsVisible.success} 
                error={flashIsVisible.error} 
                setFlash={setFlashIsVisible}
                redirect={true}
                redirectCallback={() => handleRedirect('/decks')}
            />
            <CreateDeckForm>
                <CreateDeckForm.Title text={t("new deck")}/>
                <CreateDeckForm.Name 
                    placeholder={t("Enter Deck Name Placeholder")} 
                    value={datas.name} 
                    onClick={() => setIsOpen(false)} 
                    change={(e) => setDatas({...datas, name:e.target.value})}
                />
                <CreateDeckForm.Dropdown 
                    defaultTitle={dropdownTitle === "" ? t("kingdom") : dropdownTitle}
                    options={orderedKingdoms} 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen}
                    onClick={handleChoice}
                />
                <CreateDeckForm.Button text={t("create")} onClick={handleSubmit}/>
            </CreateDeckForm>
        </div>
    );
}

export default DeckCreate;
