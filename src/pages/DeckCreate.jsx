import React,{useEffect, useState} from 'react'
import {useParams, Redirect} from 'react-router-dom';

/* api */
import {getEden} from '../api/Eden.jsx'
import {getHolyBook} from '../api/HolyBook.jsx'
import {getRegister} from '../api/Register.jsx'

/* layouts */
import Layout from '../layouts/Layout'

/* components */
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'

const DeckCreate = (props) => {
    const { id } = useParams();
    const [subdecks, setSubDecks] = useState({
        eden: {},
        register: {},
        holybook: {}
    });

    const handleClickNav = (e) => {
        e.preventDefault();
        return true;
    }

    useEffect(async () => {
        let eden = await getEden(id);
        let register = await getRegister(id);
        let holybook = await getHolyBook(id);

        if(eden.code === 200){
            setSubDecks({...subdecks, eden: eden});
        }

        if(register.code === 200){
            setSubDecks({...subdecks, register: register});
        }

        if(holybook.code === 200){
            setSubDecks({...subdecks, holybook: holybook});
        }
        console.log(subdecks)
    },[])

    return (
        <Layout>
            {
             subdecks.eden.message && 
             subdecks.eden.message instanceof Array && 
             subdecks.eden.message > 0 ?
                <Redirect to={`/decks/${id}/eden`} />
                :
                <Button text="create eden" onClick={handleClickNav} />
            }
            {
             subdecks.register.message && 
             subdecks.register.message instanceof Array && 
             subdecks.register.message > 0 ?
                <Redirect to={`/decks/${id}/register`} />
                :
                <Button text="create register" onClick={handleClickNav}/>
            }
            {
             subdecks.holybook.message && 
             subdecks.holybook.message instanceof Array &&
             subdecks.holybook.message > 0 ?
                <Redirect to={`/decks/${id}/holybook`} />
                :
                <Button text="create holybook" onClick={handleClickNav}/>
            }
        </Layout>
    )
}

export default DeckCreate;
