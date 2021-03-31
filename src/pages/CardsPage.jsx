import React from 'react'
import CardList from '../components/CardList'
import Image from '../../src/img/cards/merrlyn.jpg';


const CardsPage = () => {
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
        },
        {
            id: 11,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 12,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 13,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 14,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 15,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 16,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 17,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 18,
            url: Image,
            alt: "Ceci est une carte"
        },
        {
            id: 19,
            url: Image,
            alt: "Ceci est une carte"
        },
    ]
    return (
        <CardList data={cards}/>
    )
}

export default CardsPage
