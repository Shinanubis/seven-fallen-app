import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function SubDeckPage(){

    let { id } = useParams();

    return (
        <h1>Welcome in {id} page</h1>
    )
}

export default SubDeckPage;