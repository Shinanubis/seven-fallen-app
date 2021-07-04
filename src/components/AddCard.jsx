import {FiPlus} from 'react-icons/fi';

function AddCard(props) {
    const {classes, onClick} = props;
    return (
            <div className={classes ? classes : "card__thumbnail--container"} onClick={onClick}>
                <FiPlus />
            </div>
    )
}

export default AddCard;
