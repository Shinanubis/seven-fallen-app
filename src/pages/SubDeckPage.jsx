import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

function SubDeckPage(props){

    let {id} = useParams();
    let endUrl = props.location.pathname.split('/');
    endUrl = endUrl[endUrl.length - 1];

    return (
        <h1 className="title">Welcome in deck {id} in {endUrl}</h1>
    )
}

export default SubDeckPage;