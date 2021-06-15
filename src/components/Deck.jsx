import React, {useState, useEffect}from 'react';
import {deleteUserDeck, getUserDecks} from '../api/Decks';
import {AiFillCloseCircle} from 'react-icons/ai';
import {BsPencil} from 'react-icons/bs';
import {Link} from 'react-router-dom'

const Deck = (props) => {
    const {
            id, 
            title,
            total_ec, 
            description, 
            num_cards, 
            listState, 
            listStateSetter, 
            handleFlash, 
            deleteStateSetter, 
            reqOptState
        } = props;

    const [openModify, setOpenModify] = useState(false);
    
    const removeData = async () => {
        let deleteResponse = await deleteUserDeck(id);
        let getResponse = await getUserDecks(reqOptState);
        
        if(deleteResponse.code === 200){
            handleFlash(true);
        }else if(deleteResponse.code !== 200){
            handleFlash(false);
        }else{
            handleFlash(null);
        }
        
        listStateSetter(getResponse);
        deleteStateSetter(deleteResponse);
    }

    const handleClick = (e, state, id) => {
        e.preventDefault();
        removeData();
    }

    const handleModify = (e) => {
        e.preventDefault();
        setOpenModify(true);
    }
    
    return (
        <li key={id} className="deck__block">
            <div className="deck__inner--left">
                <h3 className="deck__title">{title}</h3>
                <p className="deck__infos">{description}</p>
                <div className="deck__total">Total : {num_cards}</div>
            </div>
            <div className="deck__inner--right">
                <div className="inner__right--text">
                    <h3 className="deck__ec--title">Ec :</h3>
                    <span className="deck__ec--value">{total_ec}</span>
                </div>
                <div className="inner__right--actions">
                    <div className="action" onClick={(e) => handleClick(e, listState, id)}><AiFillCloseCircle/></div>
                    <Link className="action" to={{
                        pathname: '/decks/modify',
                        deckProps: {id: id},
                        options:[
                            [1, 'Poseidia'],
                            [2, 'Eondra'],
                            [3, 'Endless night'],
                            [4, 'MetaScience'],
                            [5, 'The light\'s temple'],
                            [6, 'Celestial purity'],
                            [7, 'The saber\'s way'],
                        ],
                        optionsName:'Kingdoms'
                    }}><BsPencil/></Link>
                </div>
            </div>
        </li>
    )
}

export default Deck;
