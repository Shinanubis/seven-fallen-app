import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {GiReturnArrow} from 'react-icons/gi';

function Return(props){

    const [red, setRed] = useState(false);

    const handleClick = function(e){
        e.preventDefault();
        setRed(true);
    }

    return (
        <>
            <div className = "return__block" onClick={handleClick}>
                <GiReturnArrow className="return__icon" />
                {red === true ? <Redirect to='/decks' /> : null}
            </div>
        </>
    );
}

export default Return;