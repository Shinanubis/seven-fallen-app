import {Link} from 'react-router-dom';
import Body from './Body';
import Energy from './Energy';
import Heading from './Heading';
import Name from './Name';
import KingdomLogo from './KingdomLogo';
import "./Deck.css";

function Deck({id, backgroundUrl,children}) {
    return (
        <Link className="deck deck__link" to={`/decks/${id}`} style={backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`} : null}>
            {children}
        </Link>
    )
}

Deck.Heading = Heading;
Deck.Body = Body;
Deck.Energy = Energy;
Deck.Name = Name;
Deck.Logo = KingdomLogo;

export default Deck;
