import './App.css'

//Layout element import
import Footer from'./layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Menu from './components/Menu'

//Router import
import {BrowserRouter as Router} from 'react-router-dom'
import Navigation from './components/Navigation'

// Pages import
import LandingPage from './pages/LandingPage'
import DecksPage from './pages/DecksPage'
import CardsPage from './pages/CardsPage'
import ProfilePage from './pages/ProfilePage'
import GamersPage from './pages/GamersPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  const pages = [
    {
      exact: true,
      path:'/',
      component: LandingPage
  
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
    <Router basename="/">
      <Header>
      </Header>
      <Main>
          <Navigation pages={pages}/>
      </Main>
      <Footer>
          <Menu/>
      </Footer>
    </Router>

  );
}

export default App;