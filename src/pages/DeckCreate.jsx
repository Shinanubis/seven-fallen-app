import React,{useEffect, useState} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import { GiStack } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';

/* api */
import {getEden} from '../api/Eden.jsx';
import {getHolyBook} from '../api/HolyBook.jsx';
import {getRegister} from '../api/Register.jsx';

/* layouts */
import Layout from '../layouts/Layout';

/* components */
import Button from '../components/Button';

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

    useEffect(() => {
        console.log(subdecks)
    },[subdecks]);

    useEffect(async () => {
        let eden = await getEden(id);
        let register = await getRegister(id);
        let holybook = await getHolyBook(id);
        const response = {};

        if(eden.message){
            response = {...response, eden: eden}
        }

        if(register.message){
            response = {...response, register: register}
        }

        if(holybook.message){
            response = {...response, holybook: holybook}
        }

        setSubDecks(response);
    },[])

    return (
        <Layout>
            {
             subdecks.eden.message instanceof Array ?
                <div className="subdeck__box">
                    <div className="subdeck__heading">
                        <h4 className="subedeck__type title">eden</h4>
                    </div>
                    <div classsName="subdeck__body row justify-between px-2">
                        <GiStack className="subdeck__icon" />
                        <AiFillDelete className="subdeck__icon" />
                    </div>
                </div>
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
