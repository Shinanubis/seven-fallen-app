import dotenv from 'dotenv';
dotenv.config();

async function getCardsByType(id, deckId){
    try{
        let settings = {
            method: "GET",
            credentials: "include"
        };

        let response = await fetch(process.env.REACT_APP_BASE_URL + `/api/decks/${deckId}/cards/${id}`, settings);
        let datas = await response.json();

        if(response.status !== 200){
            throw {
                code: response.status,
                message: datas.message
            }
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
    try{
        let form = new FormData();
        form.append('payload', JSON.stringify(payload));

        let settings = {
            method: "PATCH",
            credentials: "include",
            body: form
        };
        

        let response = await fetch(process.env.REACT_APP_BASE_URL + `/api/decks/${deckId}/cards/${id}`, settings);
        let datas = await response.json();

        if(response.status !== 200){
            throw {
                code: response.status,
                message: datas.message
            }
        }

        return {
            code: response.status,
            message: datas
        }
    }catch(e){
        return e;
    }
}

export {
    getCardsByType,
    updateCardsByType
}