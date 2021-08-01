import React, { useEffect} from 'react';

/* components */
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import './DecksPage.css';

/*api*/
import {getProfile} from '../api/Profile';
import { getUserDecks } from '../api/Decks';

const DecksPage = (props) => {
    
    useEffect(async () => {
        let profile = await getProfile();
        console.log(profile);

        let userDecks = await getUserDecks();
        console.log(userDecks)
    },[])

    return (
        <PageContainer classes="decks">
            <section className="heading">
                <div className="heading__pseudo">PABLO</div>
                <img className="heading__logo" src={Logo} alt="7fallen logo" />
                <div className="heading__counter">DECKS 25</div>
            </section>
        </PageContainer>
    );
}

export default DecksPage;
