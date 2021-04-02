import React from 'react'
import List from '../components/List'
import StarterDeck from '../components/StarterDeck'
import Button from '../components/Button'

const StarterPage = (props) => {
    console.log(props)
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
        <div className="page">
            <List classes="layout layout__1">
                {
                    datas.map(elmt => (<StarterDeck title={elmt.title} infos={elmt.infos} EC={elmt.EC} />))
                }
            </List>
            <Button classes='btn' text="cancel" onClick={props.history.goBack}/>
        </div>
    )
}

export default StarterPage
