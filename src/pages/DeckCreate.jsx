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

    const handleClickNav = async (e) => {
        e.preventDefault();
        let response = null;

        if(e.target.id === 'eden'){
            response = await createEden(id);
            setSubDecks({...subdecks, eden: response});
        }

        if(e.target.id === 'register'){
            response = await createRegister(id);
            setSubDecks({...subdecks, register: response});
        }

        if(e.target.id === 'holybook'){
            response = await createHolyBook(id);
            setSubDecks({...subdecks, holybook: response});
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
            {subdecks.eden.code === 200 ?
                <div className="subdeck__box mb-2">
                    <div className="subdeck__heading py-2">
                        <h4 className="subdeck__type">eden</h4>
                    </div>
                    <div className="subdeck__body row justify-between px-2">
                        <GiStack className="subdeck__icon" />
                        <AiFillDelete className="subdeck__icon" />
                    </div>
                </div>
                :
                <Button id="eden" text="create eden" onClick={handleClickNav} />
            }
            {subdecks.register.code === 200 ?
                <div className="subdeck__box mb-2">
                    <div className="subdeck__heading py-2 mb-2">
                        <h4 className="subdeck__type">register</h4>
                    </div>
                    <div className="subdeck__body row justify-between px-2">
                        <GiStack className="subdeck__icon" />
                        <AiFillDelete className="subdeck__icon" />
                    </div>
                </div>
                :
                <Button id="register" text="create register" onClick={handleClickNav}/>
            }
            {subdecks.holybook.code === 200 ?
                <div className="subdeck__box mb-2">
                    <div className="subdeck__heading py-2 mb-2">
                        <h4 className="subdeck__type">holybook</h4>
                    </div>
                    <div className="subdeck__body row justify-between px-2">
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
