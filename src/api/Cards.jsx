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

export {getCardsByType}