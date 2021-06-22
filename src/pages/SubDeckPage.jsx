import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function SubDeckPage(){

    let params = useParams();

    useEffect(() => {
        console.log(params)
    }, []);

    return (
        <h1 className="title">Welcome in subdeck page</h1>
    )
}

export default SubDeckPage;