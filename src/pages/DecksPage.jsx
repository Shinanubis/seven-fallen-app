import React, { useEffect, useState} from 'react';

/* components */
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import './DecksPage.css';

/*api*/
import {getProfile} from '../api/Profile';
import { getUserDecks } from '../api/Decks';

const DecksPage = (props) => {
    const [pageDatas, setPageDatas] = useState({
        username : '',
        num_decks : 0
    })
    
    useEffect(async () => {
        let profile = await getProfile();
        let userDecks = await getUserDecks();
        console.log(userDecks)
    },[])

    return (
        <PageContainer>
            <header className="heading">
                <div className="heading__pseudo">PABLO</div>
                <img className="heading__logo" src={Logo} alt="7fallen logo" />
                <div className="heading__counter">DECKS 25</div>
            </header>
        </PageContainer>
    );
}

export default DecksPage;
