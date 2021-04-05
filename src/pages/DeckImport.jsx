import React from 'react'
import Layout from '../layouts/Layout'
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'

const DeckImport = () => {

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
    return (
        <Layout>
            <Dropdown classes="dropdown__menu mb-6" datas={datas} />
            <Button text="Valider"/>
        </Layout>
    )
}

export default DeckImport
