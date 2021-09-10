import { 
    IMPORT_DECK_PENDING,
    IMPORT_DECK_ERROR,
    IMPORT_DECK_SUCCESS
} from '../constantes/deckConst.js';

const initialState = {

}


export const importReducer = (state = initialState, action={}) => {
    switch(action.type){
        case IMPORT_DECK_PENDING :
            return {...state, isPending = true};
        
        case IMPORT_DECK_SUCCESS:
            return {...state, success: action.payload};

        case IMPORT_DECK_ERROR:
            return {...state, error: action.payload};

        default: 
            return {...state}
        }
} 