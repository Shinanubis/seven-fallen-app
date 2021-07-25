import {Switch,Route} from 'react-router-dom'


function Navigation(props) {
    const [pages, isAuthenticated] = props;
    return(
        
        <Switch >
            {console.log(isAuthenticated)}
            {pages.map((page, index) => {
                if(isAuthenticated === true){
                    return (
                    <Route 
                        key={index} exact={page.exact ?? page.exact} 
                        strict={page.strict ?? page.strict} path={page.path ?? page.path}
                        component={page.props ? () => <page.component {...page.props} /> : page.component}
                    />)
                }else{
                    if(page.path === '/' || page.path === '/login'){
                        return (
                            <Route 
                                key={index} exact={page.exact ?? page.exact} 
                                strict={page.strict ?? page.strict} path={page.path ?? page.path}
                                component={page.props ? () => <page.component {...page.props} /> : page.component}
                            /> 
                        )
                    }
                }

                })
            }
        </Switch>       
    )
}

export default Navigation;