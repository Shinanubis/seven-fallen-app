import {Switch, Route} from 'react-router-dom';

function AuthorizedRoutes(props) {
    const {unAuthenticatedPages, authenticatedPages, isAuthenticated} = props;

    if(isAuthenticated === true){
        return (
            <Switch>
                {authenticatedPages.map((page, index) => {
                    let Component = page.component;
                    return (
                        <Route 
                            key={index} 
                            strict={page.strict ?? page.strict}
                            exact={page.exact ?? page.exact}
                            path={page.path ?? page.path}
                            component={() => <Component />}
                        />)
                    })
                }
            </Switch>
        )
    }

    return (
        <Switch>
            {console.log(unAuthenticatedPages)}
            {
                
                unAuthenticatedPages.map((page, index) => {
                    let Component = page.component;
                    return(
                        <Route 
                            key={index}
                            strict={page.strict ?? page.strict}
                            exact={page.exact ?? page.exact}
                            path={page.path ?? page.path}
                            component={() => <Component />}    
                        />
                    )
                })
            }
        </Switch>
    )
}

export default AuthorizedRoutes
