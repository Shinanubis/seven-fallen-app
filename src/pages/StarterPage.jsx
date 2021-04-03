import React from 'react'
import List from '../components/List'
import StarterDeck from '../components/StarterDeck'
import Button from '../components/Button'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

const StarterPage = (props) => {
    const datas = [
        {
            id: 0,
            title: "Dummy",
            infos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto laborum cupiditate velit fuga.",
            EC: 250,
            cards_num: 64
        },
        {
            id: 2,
            title: "Beginner",
            infos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto laborum cupiditate velit fuga.",
            EC: 250,
            cards_num: 64
        },
        {
            id: 3,
            title: "Low Mid",
            infos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto laborum cupiditate velit fuga.",
            EC: 250,
            cards_num: 64
        },
        {
            id: 4,
            title: "Hig Mid",
            infos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto laborum cupiditate velit fuga.",
            EC: 250,
            cards_num: 64
        },
        {
            id: 5,
            title: "The cream of the crop",
            infos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto laborum cupiditate velit fuga.",
            EC: 250,
            cards_num: 64
        },

    ]
    return (
        <>
            <Header>
                <h1>Starter Decks</h1>
            </Header>
            <Main classes="page">
                <List classes="layout layout__1 mb-4">
                    {
                        datas.map((elmt, index )=> (<StarterDeck key={index} title={elmt.title} infos={elmt.infos} EC={elmt.EC} />))
                    }
                </List>
                <Button classes='btn' text="cancel" onClick={props.history.goBack}/>
            </Main>
        </>
    )
}

export default StarterPage
