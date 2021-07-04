import {FiPlus} from 'react-icons/fi';

function AddCard(props) {
    const {classes, onClick} = props;
    return (
            <div onClick={onClick}>
                <FiPlus />
            </div>
    )
}

export default AddCard;
