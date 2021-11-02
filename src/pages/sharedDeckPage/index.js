import {useContext} from "react"
import {CardsContext} from '../../contexts/CardsContext';

function SharedDeckPage() {
    const [count, increment] = useContext(CardsContext);
    return (
        <div>
            <h1>Hello i'm shared deck page !!!</h1>
            <p>Counter : {count}</p>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default SharedDeckPage;