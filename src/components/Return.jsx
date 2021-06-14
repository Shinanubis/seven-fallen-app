import React, {useHistory} from 'react-router-dom';
import {GiReturnArrow} from 'react-icons/gi';

function Return(props){

    let history = useHistory();
    return (
        <div className = "return__block">
            <GiReturnArrow className="return__icon" />
        </div>
    );
}

export default Return;