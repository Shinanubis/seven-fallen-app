import {ADD_DECK, REMOVE_DECK} from '../actions';

function UIdeckReducer(state, action){
    switch(action.type){
        case REMOVE_DECK:
            return {...state, message: action.payload};
        default
            return state;

    }
}

export default UIdeckReducer;