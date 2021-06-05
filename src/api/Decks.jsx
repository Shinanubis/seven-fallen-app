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

async function getUserDecks(page = 1, size = 10){

    let settings = {
        method: 'GET',
        credentials: 'include'
    };

    let response = await fetch(`https://test-seven.site/api/decks?page=${page}&size=${size}`, settings);
    let datas = await response.json();
    return datas;
    
}

async function getDecksByKingdoms(form){
    let settings = {
        method: 'GET',
        credentials: 'include',
        body: form
    };

    let response = await fetch('https://test-seven.site/api/decks/kingdoms', settings);
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