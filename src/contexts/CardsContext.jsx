import {createContext, useState, useMemo} from 'react';

const CardsContext = createContext();

const CardsProvider = function({children}){
    const [count, setCount] = useState(0);
    return (
        <CardsContext.Provider value={[count, () => setCount(prevState => prevState + 1)]}>
            {children}
        </CardsContext.Provider>
    )
}

const withCardsContext = function(Component){
    return function(props){
        return (
            <CardsProvider>
                <Component {...props}/>
            </CardsProvider>
        )
    }
}


export {CardsContext, withCardsContext};