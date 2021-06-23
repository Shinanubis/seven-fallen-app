import React,{useEffect, useLayoutEffect, useState} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import { GiStack } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';

/* api */
import {getEden, createEden} from '../api/Eden.jsx';
import {getHolyBook, createHolyBook} from '../api/HolyBook.jsx';
import {getRegister, createRegister} from '../api/Register.jsx';

/* layouts */
import Layout from '../layouts/Layout';

/* components */
import Button from '../components/Button';

const DeckCreate = (props) => {
    const { id } = useParams();
    const [subdecks, setSubDecks] = useState({
        eden: {
            code: null,
            message: null
        },
        register: {
            code: null,
            message: null
        },
        holybook: {
            code: null,
            message: null
        }
    });

    const handleClickNav = (e) => {
        e.preventDefault();
        if(e.target.id === 'eden' || e.target.id === 'register' || e.target.id === 'holybook' ){
            console.log(e.target.id)
        }
        return true;
    }

    useEffect(() => {
        console.log(subdecks)
    },[subdecks]);

    useEffect(async () => {
        let eden = await getEden(id);
        let register = await getRegister(id);
        let holybook = await getHolyBook(id);
        let response = {};

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
            {subdecks.eden.message instanceof Array ?
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
                <Button id="eden" text="create eden" onClick={handleClickNav} />
            }
            {subdecks.register.message instanceof Array ?
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
                <Button id="register" text="create register" onClick={handleClickNav}/>
            }
            {subdecks.holybook.message instanceof Array ?
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
                <Button id="holybook" text="create holybook" onClick={handleClickNav}/>
            }
        </Layout>
    )
}

export default DeckCreate;
