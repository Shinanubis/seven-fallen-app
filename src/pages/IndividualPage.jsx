import React from 'react'
import List from '../components/List'
import Card from '../components/Card'
import Image from '../img/cards/framus.jpg'

const IndividualPage = () => {
    const cards = [
        {
            id: 0,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 1,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 2,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 3,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 4,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 5,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 6,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 7,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 8,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 9,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 10,
            url: Image,
            alt: "Ceci est une carte"
        }
    ]
    return (
        <div className="page">
            <List classes="layout layout__3">
                {cards.map((elmt, index) => <Card id={elmt.id} url={elmt.url} alt={elmt.alt} mode=""/>)}
            </List>
        </div>
    )
}

export default IndividualPage
