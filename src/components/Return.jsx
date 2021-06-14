import {useHistory} from 'react-router-dom';
import {GiReturnArrow} from 'react-icons/gi';

function Return(props){

    let history = useHistory();
    const handleClick = function(e){
        e.preventDefault();
        history.push('/decks');
    }

    return (
        <div className = "return__block" onClick={handleClick}>
            <GiReturnArrow className="return__icon" />
        </div>
    );
}

export default Return;