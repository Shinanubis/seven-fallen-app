import React from 'react';
import {FaRegUserCircle} from 'react-icons/fa'

function Avatar({classes = "avatar", url="", alt="user avatar"}){

    return (
        <>
            {url ? 
                <img className={classes} src={url} alt={alt}/> 
                    : 
                <div className={classes}><FaRegUserCircle /></div>
            }
        </>
    );
}

export default Avatar;