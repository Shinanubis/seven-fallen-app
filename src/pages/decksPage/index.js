import { useEffect, useState, useRef, useContext } from 'react';

/* components */
import PageContainer from "../../components/PageContainer";
import Logo from '../../img/logos/7-fallen-logo-2.png';
import Deck from '../../components/deck';
import BottomMessage from '../../components/bottomMessage'
import {FiLoader} from 'react-icons/fi';

import Header from '../../components/heading';

/*api*/
import { getProfile } from '../../api/Profile';
import { getUserDecks } from '../../api/Decks';

/*styles*/
import './DecksPage.css';

/*hooks*/
import useElementHeight from '../../hooks/useElementHeight';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

/*translate*/
import {useTranslation} from "react-i18next";

/*datas*/
import kingdomsDatas from '../../settings/kingdom.js';

/*contexts*/
import {SessionContext} from '../../contexts/SessionContext';

import dotenv from 'dotenv';
dotenv.config();

const DecksPage = (props) => {
    const [pageDatas, setPageDatas] = useState({
        username: '',
        count: 0,
        page: 1,
        limit: 10,
        decks: [],
    });

    /*hooks*/
    const [loading, setIsLoading, setRef] = useInfiniteScroll();
    const [session, setLang] = useContext(SessionContext);
    const {t} = useTranslation();

    useEffect(async () => {
        let profile = await getProfile();
        let userDecks = await getUserDecks({page: pageDatas.page, size: pageDatas.limit, sens: "asc", order_by: 'id'});
        if(profile.code === 200 && userDecks.code === 200){
            let newCount = userDecks.message.shift();
            setPageDatas({...pageDatas, username: profile.message.username, count: newCount,decks: [...pageDatas.decks, ...userDecks.message]});
            setIsLoading(false);   
        }
    }, [pageDatas.page]);

    useEffect(async () => {
        if(loading === true && pageDatas.decks.length < pageDatas.count){
            setPageDatas({...pageDatas, page: pageDatas.page + 1})
        }else{
            setIsLoading(false);
        }
    }, [loading])

    return (
        <PageContainer classes="decks">
            <Header>
                <Header.Pseudo pseudo={pageDatas.username}/>
                <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                <Header.Count count={pageDatas.count > 0 ? pageDatas.count : " "} />
            </Header>
            {
                pageDatas.decks.length === 0 ?
                    <BottomMessage>
                        <BottomMessage.Text text={t("bottom message")} />
                        <BottomMessage.Icon />
                    </BottomMessage>
                :
                    <div ref={setRef} className="decks__list--container">
                        {
                            
                            pageDatas.decks.map((elmt, index) => {
                                if(typeof elmt !== 'number'){
                                    return (
                                        <Deck 
                                            classes="deck deck__link" 
                                            id={elmt.id} 
                                            backgroundUrl={
                                                (
                                                    session.divinities && 
                                                    session.divinities.filter(god => god.id === elmt.divinity)[0]
                                                ) &&
                                                process.env.REACT_APP_CARDS_STATIC + session.divinities.filter(god => god.id === elmt.divinity)[0].image_path 
                                            }
                                        >
                                                {!(session.divinities && session.divinities.filter(god => god.id === elmt.divinity)[0]) &&
                                                    <Deck.Heading>
                                                        <p>{t("no divinity")}</p>
                                                    </Deck.Heading>
                                                }
                                            <Deck.Body backgroundBodyColor={kingdomsDatas[elmt.kingdom].color}>
                                                <Deck.Logo logoUrl={kingdomsDatas[elmt.kingdom].icon_url}/>
                                                <Deck.Name name={elmt.deck_name}/>
                                                <Deck.Energy title={t("cards")} ec={elmt.num_cards}/>
                                            </Deck.Body>
                                        </Deck>
                                    )
                                }
                            })
                        }
                        {loading && <div><FiLoader className="loader"/></div>}
                    </div>
            }
        </PageContainer>
    );
}

export default DecksPage;
