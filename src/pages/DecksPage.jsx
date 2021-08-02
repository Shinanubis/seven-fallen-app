import React, { useEffect, useState } from 'react';

/* components */
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import './DecksPage.css';

import Header from '../components/heading';

/*api*/
import { getProfile } from '../api/Profile';
import { getUserDecks } from '../api/Decks';

/*styles*/
import './DecksPage.css';

const DecksPage = (props) => {
    const [pageDatas, setPageDatas] = useState({
        username: '',
        num_decks: 0
    })

    useEffect(async () => {
        let profile = await getProfile();
        let userDecks = await getUserDecks();
        console.log(userDecks)
    }, [])

    return (
        <PageContainer classes="decks">
            {/* <header className="heading">
                <div className="container">
                    <div className="heading__pseudo">PABLO</div>
                    <img className="heading__logo" src={Logo} alt="7fallen logo" />
                    <div className="heading__counter">DECKS 25</div>
                </div>
            </header> */}
            <Header>
                <Header.Pseudo pseudo="PABLO"/>
                <Header.Logo />
                <Header.Count count="25" />
            </Header>
        </PageContainer>
    );
}

export default DecksPage;
