import { AiOutlineFundProjectionScreen } from "react-icons/ai";

async function getAllDecks(){

    let settings = {
        method: 'GET',
        credentials: 'include'
    };

    let response = await fetch('https://test-seven.site/api/decks/shared', settings);
    if(response.ok){
        let datas = await response.json();
        return datas;
    }
}

async function getUserDecks(options){
    let settings = {
        method: 'GET',
        credentials: 'include'
    };
    let url = new URL('https://test-seven.site/api/decks');

    let params = {
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

async function getDecksByKingdoms(options){
    let settings = {
        method: 'POST',
        credentials: 'include',
        body: options.kingdoms
    };

    let url = new URL('https://test-seven.site/api/decks/kingdoms');

    let params = {
        page: options.page ? options.page : 1, 
        size: options.size ? options.size : 10,
        sens: options.sens ? options.sens : 'asc',
        order_by: options.order_by ? options.order_by : 'id'
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    let response = await fetch(url, settings);
    if(response.ok){
        let datas = await response.json();
        return datas;
    }
}

async function getOne(id){
    let settings = {
        method: 'GET',
        credentials: 'include',
    };

    let response = await fetch(`https://test-seven.site/api/decks/${id}`, settings);
    if(response.ok){
        let datas = await response.json();
        return datas;
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

async function updateOne(form, id){

    let settings = {
        method: 'PATCH',
        credentials: 'include',
        body: form
    };

    let response = await fetch(`https://test-seven.site/api/decks/update/${id}`, settings);
    if(response.ok){
        let datas = await response.json();
        return datas;
    }

}

async function deleteUserDeck(id){
    let settings = {
        method: 'DELETE',
        credentials: 'include'
    };

    let response = await fetch(`https://test-seven.site/api/decks/delete/${id}`, settings);
    if(response.ok){
        let datas = await response.json();
        return datas;
    }
}

export { getAllDecks, getDecksByKingdoms, getUserDecks, getOne, updateOne, deleteUserDeck, createUserDeck};