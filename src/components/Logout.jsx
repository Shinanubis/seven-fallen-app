import React from 'react';
import {AiOutlineLogout} from 'react-icons/ai';

function Logout(props){
    const {containerClasses} = props;

    return (
        <div className={containerClasses ?? 'logout'}>
            <AiOutlineLogout/>
        </div>
    );
}

export default Logout;