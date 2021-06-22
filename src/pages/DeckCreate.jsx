import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';

/* api */
import {getEden} from '../api/Eden.jsx'
import {getHolyBook} from '../api/HolyBook.jsx'
import {getRegister} from '../api/Register.jsx'

/* layouts */
import Layout from '../layouts/Layout'

/* components */
import Dropdown from '../components/Dropdown'
import NavButton from '../components/NavButton'

const DeckCreate = (props) => {
    const { id } = useParams();
    const [subdecks, setSubDecks] = useState({
        eden: {},
        register: {},
        holybook: {}
    });

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
    },[])

    return (
        <Layout>
            {
             subdecks.eden.message && 
             subdecks.eden.message instanceof Array && 
             subdecks.eden.message > 0 ?
                <h1>Hello i'm Eden</h1>
                :
                <NavButton text="create eden" timing={1000}/>
            }
            {
             subdecks.register.message && 
             subdecks.register.message instanceof Array && 
             subdecks.register.message > 0 ?
                <h1>Hello i'm Register</h1>
                :
                <NavButton text="create register" timing={1000}/>
            }
            {
             subdecks.holybook.message && 
             subdecks.holybook.message instanceof Array &&
             subdecks.holybook.message > 0 ?
                <h1>Hello i'm Holybook</h1>
                :
                <NavButton text="create holybook" timing={1000}/>
            }
        </Layout>
    )
}

export default DeckCreate;
