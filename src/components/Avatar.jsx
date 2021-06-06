import React, {useState, useEffect} from 'react';
import {AiOutlineUser} from 'react-icons/ai'

function Avatar(props){
    const {classes, url} = props;

    return (
        <>
            {url ? 
                <img className={classes ?? "avatar"} src={url} /> 
                    : 
                <div className={classes ?? "avatar"}><AiOutlineUser/></div>
            }
        </>
    );
}

export default Avatar;