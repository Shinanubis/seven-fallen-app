import React,  {useState} from 'react'
import List from '../components/List'
import User from '../components/User'
import SearchBar from '../components/SearchBar'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

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
    
    const [searchValue, setSearchValue] = useState(null)
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }


    return (
        <>
            <Header classes="header">
                <h1>Gamers</h1>
            </Header>
            <Main classes="page">
                <List classes="layout layout__3 mb-4">
                    {
                        users.map(elmt => {
                            return (
                                <User key={elmt.id} content={elmt}/>
                            )
                        })
                    }
                </List>
                <SearchBar 
                    classes="search__bar" inputClasses="search__bar--input" 
                    iconClasses="search__bar--icon" 
                    onChange={handleSearch} text={searchValue}
                    placeholder={"Search ..."}
                />
            </Main>
        </>
    )
}

export default GamersPage
