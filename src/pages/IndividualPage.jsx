import React, {useState, useEffect} from 'react'
import List from '../components/List'
import Card from '../components/Card'
import Image from '../img/cards/framus.jpg'
import Button from '../components/Button'
import CardsContext from '../contexts/CardsContext'


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
    const [isSelected, setIsSelected] = useState(cards)

    const handleClick = (e) => {
        e.preventDefault()
        props.history.goBack();
    }

    const handleChange = (e, id) => {
        setIsSelected(isSelected => {
            const test = [...isSelected]
            test[id].selected = e.target.checked
            console.log(test)
            return [...test];
        })
    }




    return (
        <CardsContext.Provider value={[isSelected,setIsSelected]}>
        <div className="page">
            <List classes={`layout layout__3 ${!isSelected.some(elmt => elmt.selected) ? "mb-6" : "mb-2"}`}>
                {isSelected.map(elmt => <Card key={elmt.id} id={elmt.id} url={elmt.url} alt={elmt.alt} mode="edit" onChange={(e) => handleChange(e,elmt.id)}/>)}
            </List>
            {isSelected.some(elmt => elmt.selected) ? <Button classes="btn" text="add"/> : ''}
            <Button classes="btn" text="cancel" onClick={handleClick}/>
        </div>
        </CardsContext.Provider>
    )
}

export default IndividualPage
