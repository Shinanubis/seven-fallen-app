import React, { useEffect, useState } from 'react';

/* layout */
import Layout from '../layouts/Layout';

/* api */
import { getUserDecks, getDecksByKingdoms } from '../api/Decks';
import { getEdenCards } from '../api/CardsWareHouse';

/* components */
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import './deckspage.css';

const DecksPage = (props) => {
    return (
        <PageContainer classes="decks">
            <section className="heading">
                <div className="heading__pseudo">PABLO</div>
                <img className="heading__logo" src={Logo} alt="7fallen logo" />
                <div className="heading__counter">NB DECKS 25</div>
            </section>
        </PageContainer>
    );
}


export default DecksPage;
