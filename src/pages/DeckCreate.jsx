import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';

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
    const datas = [
        {
            id: 0,
            title: "EDEN 0/3",
            target: "#item__1",
            target_id:"item__1",
            content:"Divinité 0/1 Archange 0/1 Temple 0/1"
        },
        {
            id:1,
            title: "REGISTRE 0/10",
            target: "#item__2",
            target_id:"item__2",
            content:"Adorateurs 0/10"
        },
        {
            id:2,
            title: "LIVRE SACRE 0/50 +",
            target: "#item__3",
            target_id:"item__3",
            content:"Anges 0 Golems 0 Miracles 0 Equipments 0"
        }
    ]

    useEffect(() => {
        let eden = getEden(id);
        console.log(eden)
    },[])

    return (
        <Layout>
            <Dropdown classes="dropdown__menu mb-6" datas={datas} />
            <Button text="Valider"/>
        </Layout>
    )
}

export default DeckCreate;
