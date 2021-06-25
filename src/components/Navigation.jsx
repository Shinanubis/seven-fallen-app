import {Switch,Route} from 'react-router-dom'


function Navigation({pages}) {
    return(
        
        <Switch > 
            {pages.map((page, index) => (    
                    <Route 
                        key={index} exact={page.exact ?? page.exact} 
                        strict={page.strict ?? page.strict} path={page.path ?? page.path}
                        component={page.props ? () => <page.component {...page.props} /> : page.component}
                        datas={page.datas ?? pages.datas}
                    />
                ))}
        </Switch>       
    )
}

export default Navigation;