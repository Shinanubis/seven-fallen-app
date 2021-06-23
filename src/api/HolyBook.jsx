async function getHolyBook(id){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }
    
    let response = await fetch(`https://test-seven.site/api/decks/${id}/holybook`,settings);
    let datas = await response.json();
    return datas;
}

async function getHolyBookCards(id){
    let settings = {
        method : 'GET',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api/decks/${id}/holybook/cards`, settings);
    let datas = await response.json();
    return datas;
}

async function createHolyBook(id){

    let settings = {
        method: 'POST',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api//decks/${id}/holybook/create`, settings);
    let datas = await response.json();
    return datas;
}

async function deleteHolyBook(id){
    let settings = {
        method: 'DELETE',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api//decks/${id}/holybook/delete`, settings);
    let datas = await response.json();
    return datas;
}

export { getHolyBook, getHolyBookCards, createHolyBook, deleteHolyBook };