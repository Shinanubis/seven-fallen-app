import React from 'react'
import Layout from '../layouts/Layout'
import NavButton from '../components/NavButton'

const DeckBuildOptions = (props) => {



    return (
        <>
            <Layout>
                <h1>Options :</h1>
                <div className="block">
                    <NavButton text="create" url="/decks/new-deck/create"/>
                    <NavButton text="import" url="/decks/new-deck/import"/>
                </div>
                <NavButton text="back" url="/decks"/>
            </Layout>

        </>
    )
}

export default DeckBuildOptions
