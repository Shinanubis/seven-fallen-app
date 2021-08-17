import {useState} from 'react'
import CreateDeckForm from "../components/createDeckForm";
import {GrCaretDown} from 'react-icons/gr';
import './DeckCreate.css';
import Header from '../components/heading';
import Logo from '../img/logos/7-fallen-logo-2.png';
import {createUserDeck} from '../api/Decks';
import filterById from '../utilities/filterById';
import {useTranslation} from 'react-i18next';

function DeckCreate(props){

    const [isOpen, setIsOpen] = useState(false);
    const [datas, setDatas] = useState({
        name:"",
        kingdom: ""
    });

    const {t} = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("deck_name", datas.name.trim());
        form.append("kingdom", datas.kingdom);
        for(let pair of form.entries()){
            console.log(pair[0] + " : " + pair[1])
        }
    }

    const handleChoice = (e) => {
        setDatas({...datas, kingdom: e.target.id});
        setIsOpen(false)
    }

    return (
        <div className="create container">
            <Header>
                <Header.Logo url={Logo} alt="Logo 7fallen"/>
            </Header>
            <CreateDeckForm>
                <CreateDeckForm.Title text={t("new deck")}/>
                <CreateDeckForm.Name 
                    placeholder={t("Enter Deck Name Placeholder")} 
                    value={datas.name} 
                    onClick={() => setIsOpen(false)} 
                    change={(e) => setDatas({...datas, name:e.target.value})}
                />
                <CreateDeckForm.Dropdown 
                    title={datas.kingdom === "" ? t("kingdom") : filterById(JSON.parse(sessionStorage.getItem("kingdoms")),datas.kingdom, "name")}
                    options={JSON.parse(sessionStorage.getItem("kingdoms"))} 
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
