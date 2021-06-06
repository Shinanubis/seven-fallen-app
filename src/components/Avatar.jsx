import React, {useState, useEffect} from 'react';
import {AiOutlineUser} from 'react-icons/ai'

function Avatar(props){
    const {classes, url} = props;

    return (
        <img className={classes ?? "avatar"} src={url ?? AiOutlineUser} />
    );
}

export default Avatar;