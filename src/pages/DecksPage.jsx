import React, { useEffect} from 'react';

/* components */
import Flash from '../components/Flash'
import Plus from '../components/Plus';
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import './DecksPage.css';
import {getProfile} from '../api/Profile';

const DecksPage = (props) => {
    
    useEffect(async () => {
        let profileResponse = await getProfile();
        console.log(profileResponse);
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
