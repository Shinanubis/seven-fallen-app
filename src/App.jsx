import { useEffect } from 'react'

//Layout element import
import Footer from'./layouts/Footer';
import Menu from './components/Menu';

//Settings import
import {BrowserRouter as Router} from 'react-router-dom';

//Components imports
import Navigation from './components/Navigation';
import Header from './layouts/Header';
import Avatar from './components/Avatar';
import Logout from './components/Logout';

// Pages import
import LandingPage from './pages/LandingPage';
import DecksPage from './pages/DecksPage';
import CardsPage from './pages/CardsPage';
import ProfilePage from './pages/ProfilePage';
import GamersPage from './pages/GamersPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import SettingsDeckPage from './pages/SettingsDeckPage';
import AddingDeckPage from './pages/AddingDeckPage';
import ChoicePage from './pages/ChoicePage';
import SubscribePage from './pages/SubscribePage';
import StarterPage from './pages/StarterPage';
import IndividualPage from './pages/IndividualPage';
import DeckBuildOptions from './pages/DeckBuildOptions';
import DeckCreate from './pages/DeckCreate';
import DeckImport from './pages/DeckImport';
import EmptyDecksList from './pages/EmptyDecksList';
import ModifyDeckPage from './pages/ModifyDeckPage';
import SubDeckPage from './pages/SubDeckPage';

//Utilities import
import VhInPixels from './utilities/VhInPixels';
import { getRaritiesList, getTypesList, getKingdomsList, getCapacitiesList, getExtensionsList, getSubdeckCards, getClassesList } from './api/CardsWareHouse';

function App() {

  const pages = [
    {
        exact: true,
        path:'/',
        component: LandingPage,
    },
    {
        strict: true,
        path:'/login',
        component: LoginPage,
    },
    {
        strict: true,
        path:'/subscribe',
        component: SubscribePage,
    },
    {
        strict: true,
        path:'/profile',
        component: ProfilePage
    },
    {
        exact:true,
        strict: true,
        path:'/decks',
        component: DecksPage
    
    },
    {
        exact:true,
        strict: true,
        path:'/decks/create',
        component: AddingDeckPage
    },
    {
        exact:true,
        strict: true,
        path:'/decks/empty',
        component: EmptyDecksList,
        props: {text: "No Decks "} 
    },
    {
        exact: true,
        strict: true,
        path: '/decks/:id/modify',
        component: ModifyDeckPage
    },
    {
        exact:true,
        strict: true,
        path:'/decks/:id/subdecks',
        component: DeckCreate
    },
    {
        exact:true,
        strict: true,
        path:'/decks/:id/eden',
        component: SubDeckPage
    },
    {
        exact:true,
        strict: true,
        path:'/decks/:id/register',
        component: SubDeckPage
    },
    {
        exact:true,
        strict: true,
        path:'/decks/:id/holybook',
        component: SubDeckPage
    },
    {
        exact:true,
        strict: true,
        path:'/decks/new-deck/build',
        component: DeckBuildOptions
    },
    {
        exact:true,
        strict: true,
        path:'/decks/new-deck/import',
        component: DeckImport
    },
    {
        exact:true,
        strict: true,
        path:'/cards',
        component: CardsPage,
    },
    {
        exact:true,
        strict: true,
        path:'/cards/from',
        component: ChoicePage,
    },
    {
        strict:true,
        path:'/cards/from/starter',
        component: StarterPage,
    },
    {
        strict:true,
        path:'/cards/from/individual',
        component: IndividualPage,
    },
    {

        strict: true,
        path:'/deck/:name',
        component: SettingsDeckPage
    },
    {

        strict: true,
        path:'/gamers',
        component: GamersPage
    },
    {
        component: ErrorPage
    },
  ]

  useEffect(async () => {
    let types = await getTypesList('FR');
    let kingdoms = await getKingdomsList('FR');
    let rarities = await getRaritiesList('FR');
    let classes = await getClassesList('FR');
    let capacities = await getCapacitiesList('FR');
    let extensions = await getExtensionsList('FR');

    sessionStorage.setItem('type',types); 
    console.log(sessionStorage.getItem(types))
  }, []);

  return (
        <>
          <VhInPixels/>
          <Router basename="/">
            <Header classes="header row justify-end">
                <div className='header__inner--right row justify-between'>
                    <Avatar />
                    <Logout />
                </div>
            </Header>
              <Navigation pages={pages} />
            <Footer classes="footer">
              <Menu classes="navbar" />
            </Footer>
          </Router>
        </>
  );
}

export default App;