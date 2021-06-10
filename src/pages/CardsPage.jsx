import React from 'react';
import CardList from '../components/CardList';
import Plus from '../components/Plus';
import Image from '../../src/img/cards/merrlyn.jpg';
import Main from "../layouts/Main";
import List from '../components/List';
import Card from '../components/Card';
import Pagination from "../components/Pagination";

const CardsPage = (props) => {
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

    const handlePage = () => {
        return null;
    }

    const handleSize = () => {
        return null;
    }

    return (
            <Main classes="page">
                <List classes="list__content layout layout__3 mb-5">
                    {cards.map(elmt => <Card key={elmt.id} url={elmt.url} alt={elmt.alt}/>)}
                </List>
                <Pagination 
                    list = {cards} 
                    containerClasses = "pagination__block my-3 row justify-between"
                    containerTextBlockClasses = {"pagination__text--block row justify-between"} 
                    setPage={handlePage} 
                    setSize={handleSize}
                    listSize={[10,20,40]}
                /> 
                <Plus to="/cards/from"/>
            </Main>
    )
}

export default CardsPage
