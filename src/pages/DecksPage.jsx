import React, { useEffect} from 'react';

/*hoc*/
import hasProvider from '../HOC/hasProvider';

/* components */
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import './DecksPage.css';

const deckPage = (props) => {
    
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

const DecksPage = hasProvider(deckPage);
export default DecksPage;
