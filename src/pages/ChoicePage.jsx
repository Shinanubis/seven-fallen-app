import React,{useEffect, useReducer} from 'react'
import Button from '../components/Button'



function reducer(state,action){
    switch(action.type){
        case 'STARTER_DECK':
            return { choice:"/cards/from/starter"};
        case 'INDIVIDUAL':
            return { choice:"/cards/from/individual"};
        case 'BACK':
            return { choice:"/cards"};
        default:
            return state;
    }
}

const ChoicePage = (props) => {
    const init = {choice: "/cards/from"}
    const [isClicked, dispatch] = useReducer(reducer,init);
    
    const handleClick = (e,action) => {
        e.preventDefault();
        dispatch({type:action})
    }

    useEffect(() => {
        props.history.push(isClicked.choice);
    }, [isClicked]) 

    return (        
            <>
                <div className="block">
                    <Button classes="btn" text="Starter Deck" onClick={(e) => handleClick(e,"STARTER_DECK")}/>
                    <Button classes="btn" text="Individual Card" onClick={(e) => handleClick(e,"INDIVIDUAL")}/> 
                </div>
                <Button classes="btn" text="cancel" onClick={(e) => handleClick(e,"BACK")}/> 
            </>
    )
}

export default ChoicePage
