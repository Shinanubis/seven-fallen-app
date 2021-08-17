import React, { useEffect, useState } from 'react';

/* components */
import PageContainer from "../components/PageContainer";
import Logo from '../img/logos/7-fallen-logo-2.png';
import Deck from '../components/deck';
import BottomMessage from '../components/bottomMessage'

import Header from '../components/heading';

/*api*/
import { getProfile } from '../api/Profile';
import { getUserDecks } from '../api/Decks';

/*styles*/
import './DecksPage.css';

/*hooks*/
import useElementHeight from '../hooks/useElementHeight';

/*translate*/
import i18n from '../i18n';
import {useTranslation} from "react-i18next";

/*datas*/
import kingdomsDatas from '../settings/kingdom.js';

const DecksPage = (props) => {
    const [pageDatas, setPageDatas] = useState({
        username: '',
        decks: [],
    });

    const {t} = useTranslation();

    useEffect(async () => {
        let profile = await getProfile();
        let userDecks = await getUserDecks({page: 1, size: 10, sens: "asc", order_by: 'id'});
        setPageDatas({...pageDatas, username: profile.message.username});
    }, []);

    return (
        <PageContainer classes="decks">
            <Header>
                <Header.Pseudo pseudo={ pageDatas.username ? pageDatas.username : "   " }/>
                <Header.Logo url={Logo} alt="Logo 7fallen"/>
                <Header.Count count={pageDatas.decks.length} />
            </Header>
            {
                pageDatas.decks.length === 0 ?
                    <BottomMessage>
                        <BottomMessage.Text text={t("bottom message")} />
                        <BottomMessage.Icon />
                    </BottomMessage>
                :
                    <div className="container">
                        {
                            pageDatas.decks.map(elmt => {
                                return (
                                    <Deck>
                                        <Deck.Header>
                                        </Deck.Header>
                                        <Deck.Body>
                                            <Deck.Logo />
                                            <Deck.Name />
                                            <Deck.Energy />
                                        </Deck.Body>
                                    </Deck>
                                )
                            })
                        }
                    </div>
            }
        </PageContainer>
    );
}

export default DecksPage;
