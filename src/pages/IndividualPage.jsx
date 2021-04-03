import React from 'react'
import List from '../components/List'
import Card from '../components/Card'
import Image from '../img/cards/framus.jpg'
import Button from '../components/Button'

const IndividualPage = (props) => {
    const cards = [
        {
            id: 0,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 1,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 2,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 3,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 4,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 5,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 6,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 7,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 8,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 9,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        },
        {
            id: 10,
            url: Image,
            alt: "Ceci est une carte",
            selected: false 
        }
    ]

    const handleClick = (e) => {
        e.preventDefault()
        props.history.goBack();
    }

    return (
        <div className="page">
            <List classes="layout layout__3">
                {cards.map((elmt, index) => <Card id={elmt.id} url={elmt.url} alt={elmt.alt} mode="edit"/>)}
            </List>
            <Button classes="btn" text="cancel" onClick={handleClick}/>
        </div>
    )
}

export default IndividualPage
