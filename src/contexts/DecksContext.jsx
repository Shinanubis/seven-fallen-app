import {createContext} from 'react'

const Context = createContext();

const DecksContext = (props) => {
    return (
        <Context.Provider value={props.state, props.dispatcher}>
            {props.children}
        </Context.Provider>
    )
}


export default DecksContext;