import React from 'react';
import {AiOutlineUser} from 'react-icons/ai'

function Avatar(props){
    const {classes, url, alt} = props;

    return (
        <>
            {url ? 
                <img className={classes ?? "avatar"} src={url} alt={alt}/> 
                    : 
                <div className={classes ?? "avatar"}><AiOutlineUser /></div>
            }
        </>
    );
}

export default Avatar;