import './navbar.css'
import Wrapper from './wrapper'
import Menu from './navmenu'
import Landing from './landing'
import Login from './login'
import Subscribe from './subscribe'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

function Nav() {

    return (

        <BrowserRouter>
            <nav className="navbar">
                < Menu />
            </nav>
            <Switch>
                <Wrapper>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/subscribe" component={Subscribe}/>
                </Wrapper>
            </Switch>
        </BrowserRouter>
    );
}

export default Nav;