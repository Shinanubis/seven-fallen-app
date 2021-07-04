import {FiPlus} from 'react-icons/fi';
import {Link} from 'react-router-dom';

function AddCard(props) {
    const {classes, url} = props;
    return (
        <li className={classes ? classes : "card__thumbnail--container"}>
            <Link to={url}>
                <FiPlus />
            </Link>
        </li>
    )
}

export default AddCard;
