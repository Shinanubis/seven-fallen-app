import {Link} from 'react-router-dom';
import Body from './Body';
import Energy from './Energy';
import Header from './Heading';
import Name from './Name';
import KingdomLogo from './KingdomLogo';

function Deck({id, children}) {
    return (
        <Link className="deck__link" to={`/deck/${id}`}>
            {children}
        </Link>
    )
}

Deck.Heading = Header;
Deck.Body = Body;
Deck.Name = Name;
Deck.Logo = KingdomLogo;
Deck.Energy = Energy;

export default Deck;
