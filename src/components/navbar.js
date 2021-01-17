import './navbar.css'
import Wrapper from './wrapper'
import Menu from './navmenu'
import Landing from './landing'
import Login from './login'
import Subscribe from './subscribe'
import errorPage from './404'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

function Nav() {

    return (

        <BrowserRouter>
            <nav className="navbar">
                < Menu />
            </nav>
            <Wrapper>
                <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route strict path="/login" component={Login}/>
                        <Route strict path="/subscribe" component={Subscribe}/>
                        <Route component={errorPage}/>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    );
}

export default Nav;