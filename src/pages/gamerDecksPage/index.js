import {useContext} from 'react';
import {CardsContext} from '../../contexts/CardsContext'; 

function GamerDecksPage(props) {
    const [count, increment] = useContext(CardsContext);
    
    return (
        <div>
            <h1>I'm gamer decks page</h1>
            <p>Counter : {count}</p>
            <button type="button" onClick={increment}>+</button>
        </div>
    )
}

export default GamerDecksPage;
