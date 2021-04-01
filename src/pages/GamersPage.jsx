import React from 'react'
import List from '../components/List'
import User from '../components/User'

const GamersPage = () => {

    const users = [
        {
            id: "0",
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 1,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 2,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 3,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 4,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 5,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 6,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 7,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 8,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 9,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 10,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 11,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 12,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 13,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 14,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        },
        {
            id: 15,
            title: "Pablo",
            location: "Paris FR",
            deck_num: 25
        }
    ]


    return (
        <div className="page">
            <List classes="layout layout__3">
                {
                    users.map(elmt => {
                        return (
                            <User content={elmt}/>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default GamersPage
