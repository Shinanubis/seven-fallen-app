import {createContext} from 'react';

const PagesContext = createContext([[], []]);

function PagesContextProvider(props){
    const {pages} = props;

    return (
        <PagesContext.Provider value={[pages.authenticated, pages.unAuthenticated]}>
            {props.children}
        </PagesContext.Provider>
    )
}

export {PagesContext, PagesContextProvider};
