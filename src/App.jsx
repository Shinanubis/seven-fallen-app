import './App.css'

//Layout element import
import Footer from'./layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
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

//Context import
import AuthenticationContext from './contexts/Context'

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(true)

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticate(!isAuthenticate);
  }

  const pages = [
    {
      exact: true,
      path:'/',
      component: LandingPage,

  
    },
    {
        strict: true,
        path:'/profile',
        component: ProfilePage
    
    },
    {
    
        strict: true,
        path:'/login',
        component: DecksPage
    
    },
    {

        strict: true,
        path:'/subscribe',
        component: CardsPage
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
      <Router basename="/">
        <Header>
        </Header>
        <Main>
            <Navigation pages={pages} state={isAuthenticate} login ={() => setIsAuthenticate(false)}/>
        </Main>
        <Footer classes={isAuthenticate ? "footer" : "footer h-0"}>
          <Menu classes={isAuthenticate ? "navbar" : "navbar h-0 fade-out"}/>
        </Footer>
      </Router>
    </AuthenticationContext.Provider>
  );
}

export default App;