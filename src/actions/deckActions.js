import {
    CHANGE_KINGDOM, 
    CHANGE_VISIBILITY, 
    IMPORT_DECK_PENDING, 
    IMPORT_DECK_SUCCESS, 
    IMPORT_DECK_FAILED
} from '../constantes/deckConst.js';

export const importDeck = (dispatch){
    dispatch({type: IMPORT_DECK_PENDING});
    fetch()
        .then()
        .then()
        .catch()
}

export const changeKingdom = (dispatch) => {
    dispatch({type: CHANGE_KINGDOM})
}

export const changeVisibility = (dispatch) => {
    dispatch({type:CHANGE_VISIBILITY})
}   