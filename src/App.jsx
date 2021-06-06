//Layout element import
import Footer from'./layouts/Footer'
import Menu from './components/Menu'

//Settings import
import {useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

//Components imports
import Navigation from './components/Navigation'

// Pages import
import LandingPage from './pages/LandingPage'
import DecksPage from './pages/DecksPage'
import CardsPage from './pages/CardsPage'
import ProfilePage from './pages/ProfilePage'
import GamersPage from './pages/GamersPage'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import SettingsDeckPage from './pages/SettingsDeckPage'
import AddingDeckPage from './pages/AddingDeckPage'
import ChoicePage from './pages/ChoicePage'
import SubscribePage from './pages/SubscribePage'
import StarterPage from './pages/StarterPage'
import IndividualPage from './pages/IndividualPage'
import DeckBuildOptions from './pages/DeckBuildOptions'
import DeckCreate from './pages/DeckCreate'
import DeckImport from './pages/DeckImport'


//Context import
import AuthenticationContext from './contexts/Context'

//Utilities import
import VhInPixels from './utilities/VhInPixels'
import Header from './layouts/Header'


function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false)
  const handleLogin = (e,cb) => {
    e.preventDefault();
    cb('/decks')
    setIsAuthenticate(true);
  }

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
        path:'/decks/new-deck',
        component: AddingDeckPage
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
        path:'/decks/new-deck/create',
        component: DeckCreate
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

  return (

    <AuthenticationContext.Provider value={
      {
        pages: pages,
        login: isAuthenticate,
        setLogin: handleLogin
      }
    }>
      <VhInPixels/>
      <Router basename="/">
        <Header />
          <Navigation pages={pages} state={isAuthenticate} login ={() => setIsAuthenticate(false)}/>
        <Footer classes={isAuthenticate ? "footer" : "footer h-0"}>
          <Menu classes={isAuthenticate ? "navbar" : "navbar move-down fade-out"} logged={isAuthenticate} />
        </Footer>
      </Router>
    </AuthenticationContext.Provider>

  );
}

export default App;