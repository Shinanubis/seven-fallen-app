import dotenv from 'dotenv';
dotenv.config();

async function getAllCards(id){
    try{
        let settings = {
            method: "GET",
            credentials: "include"
        };

        let response = await fetch(process.env.REACT_APP_BASE_URL + `/api/decks/${id}/cards`, settings);
        let datas = await response.json();
        if(datas.code !== 200){
            throw new Error(datas);
        }
        return datas;
    }catch(e){
        return e;
    }
}

async function getCardsByType(id, deckId){
    try{
        let settings = {
            method: "GET",
            credentials: "include"
        };

        let response = await fetch(process.env.REACT_APP_BASE_URL + `/api/decks/${deckId}/cards/${id}`, settings);
        let datas = await response.json();

        if(response.status !== 200){
            throw new Error({
                code: response.status,
                message: datas.message
            })
        }

        return {
            code: response.status,
            message: datas
        }
    }catch(e){
        return e;
    }
}

async function updateCardsByType(id, deckId, payload){
        let form = new FormData();
        form.append('payload', JSON.stringify(payload));
        let settings = {
            method: "POST",
            credentials: "include",
            body: form
        };
        

        let response = await fetch(process.env.REACT_APP_BASE_URL + `/api/decks/${deckId}/cards/${id}`, settings);
        let datas = await response.json();
        return datas;
}

async function updateOneCard(deckId, typeId, cardId, callback, state){
    try{
        let form = new FormData();
        let newObj = {...state.cards[typeId][cardId]};
        form.append('payload', JSON.stringify({card_id: Number(cardId),qty: Number(newObj.qty)}));

        let settings = {
            method: "PATCH",
            credentials: "include",
            body: form
        }; 
    
        let response = await fetch(process.env.REACT_APP_BASE_URL + `/api/decks/${deckId}/cards/${typeId}`, settings);
        let datas = await response.json();
        if(datas.code !== 200){
            throw new Error({...datas})
        }
        return callback({
            ...state,
            pending: false,
            action: '',
            success: datas.message,
            error:''
        });
    }catch(e){
        return callback({
            ...state,
            pending: false,
            action: '',
            error: e.message
        })
    }
}

export {
    getAllCards,
    getCardsByType,
    updateCardsByType,
    updateOneCard
}