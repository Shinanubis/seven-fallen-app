import './navbar.css'
import Menu from './navmenu'
import Landing from './landing'
import Login from './login'
import Subscribe from './subscribe'
import ErrorPage from './error'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import React from 'react'



function Nav() {

    const pages = [
        {
            exact: true,
            path:'/',
            component: Landing

        },
        {

            strict: true,
            path:'/login',
            component: Login

        },
        {
          
            strict: true,
            path:'/subscribe',
            component: Subscribe
        },
        {
            component: ErrorPage
        },
    ]
    

    return(
        <Router>

            <nav className="navbar">
               < Menu />
            </nav>
            <Switch>
                {pages.map((elmt, index) => (
                    <Route 
                        key={index} exact={elmt.exact ?? elmt.exact} 
                        strict={elmt.strict ?? elmt.strict} path={elmt.path ?? elmt.path}
                        render={({Component= elmt.component}) => (
                            <Component/>
                        )} 
                    />
                ))}
            </Switch>
        </Router>
    )
}

export default Nav;