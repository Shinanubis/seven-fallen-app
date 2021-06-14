import React,{useEffect, useState} from 'react';
import Layout from '../layouts/Layout';
import Return from '../components/Return'


const EmptyDecksList = () => {

    return (
            <Layout>
                <div className="decks__list">
                    <p className="deck__list--empty">No Decks</p>
                </div>
                <Return />
            </Layout>
    )
}



export default EmptyDecksList;
