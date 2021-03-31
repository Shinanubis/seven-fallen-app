import React from 'react'
import CardList from '../components/CardList'
import Image from '../../src/img/cards/sm-merrlyn.png';


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
    ]
    return (
        <CardList data={cards}/>
    )
}

export default CardsPage
