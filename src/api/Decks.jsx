import {serialize} from '../utilities/serialize.js';
import dotenv from 'dotenv';
dotenv.config();

async function getAllDecks(options){
    try{
        let settings = {
            method: 'GET',
            credentials: 'include'
        };
        let url = new URL(process.env.REACT_APP_BASE_URL + '/api/decks/shared');

        if(options.page){
            url.searchParams.append('page',options.page);
        }

        if(options.size){
            url.searchParams.append('size', options.size);
        }

        if(options.order_by){
            url.searchParams.append('order_by', options.order_by);
        }

        if(options.sens){
            url.searchParams.append('sens', options.sens);
        }

        if(options.divinity){
            url.searchParams.append('divinity', options.divinity);
        }

        if(options.kingdoms){
            url.searchParams.append('kingdoms', `[${options.kingdoms.join(',')}]`);
        }

        if(options.search){
            url.searchParams.append('search', options.search);
        }

        let response = await fetch(url, settings);
        let datas = await response.json();
        return datas;
    }catch(e){
        return e;
    }
}

async function getUserDecks(options){
    let settings = {
        method: 'GET',
        credentials: 'include'
    };
    let url = new URL('https://test-seven.site/api/decks');

    let params = {
        page: options.page ?? 1, 
        size: options.size ? options.size : 10,
        sens: options.sens ? options.sens : 'desc',
        order_by: options.order_by ? options.order_by : 'created_at'
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    let response = await fetch(url, settings);
    let datas = await response.json();
    return datas;
    
}

async function getDecksByKingdoms(options){
    let form = new FormData();
    let kingdoms = await serialize(options.kingdoms);
    form.append('kingdoms', kingdoms);
    let settings = {
        method: 'POST',
        credentials: 'include',
        body: form
    };

    let url = new URL('https://test-seven.site/api/decks/kingdoms');

    let params = {
        mode: options.mode ? options.mode : "",
        page: options.page ? options.page : 1, 
        size: options.size ? options.size : 10,
        sens: options.sens ? options.sens : 'asc',
        order_by: options.order_by ? options.order_by : 'id'
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    let response = await fetch(url, settings);
    let datas = await response.json();
    return datas;
}

async function getOne(id){
    let settings = {
        method: 'GET',
        credentials: 'include',
    };

    let response = await fetch(`https://test-seven.site/api/decks/${id}`, settings);
    let datas = await response.json();
    return datas;
}

async function fetchDeckInfos(id, state, callback){
    try {
        let settings = {
            method: 'GET',
            credentials: 'include',
        };

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/decks/${id}`, settings);

        if(response.status >= 400 && response.status <= 499){
            let error = await response.json();
            throw new Error({...error})
        }
        
        let datas = await response.json();
        return callback({
            ...state,
            error: {},
            success: {...datas.message}
        })
    } catch (error) {
        return callback({
            ...state,
            error,
        })
    }
}

async function createUserDeck(form){

    let settings = {
        method: 'POST',
        credentials: 'include',
        body: form
    };

    let response = await fetch('https://test-seven.site/api/decks/add', settings);
    let datas = response.json();
    return datas;
}

async function updateOne(newDatas, id){
        let form = new FormData();
        let settings = {
            method: 'PATCH',
            credentials: 'include',
            body: form
        };
        
        // eslint-disable-next-line array-callback-return
        Object.keys(newDatas).map(elmt => {
             form.append(elmt, newDatas[`${elmt}`]);
        });
        let response = await fetch(`https://test-seven.site/api/decks/update/${id}`, settings);
        let datas = await response.json();
        return datas;
}

async function deleteUserDeck(id){
    let settings = {
        method: 'DELETE',
        credentials: 'include'
    };

    let response = await fetch(`https://test-seven.site/api/decks/delete/${id}`, settings);
    let datas = await response.json();
    return datas;

}

export {
    fetchDeckInfos,
    getAllDecks, 
    getDecksByKingdoms, 
    getUserDecks, 
    getOne, 
    updateOne, 
    deleteUserDeck, 
    createUserDeck
};