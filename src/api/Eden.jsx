async function getEden(id){

    let settings = {
        method: 'GET',
        credentials: 'include'
    }
    let response = await fetch(`https://test-seven.site/api/decks/${id}/eden`, settings);
    let datas = await response.json();
    return datas;
}

async function getEdenCards(id){
    let settings = {
        method : 'GET',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api/decks/${id}/eden/cards`, settings);
    let datas = await response.json();
    return datas;
}

async function createEden(id){

    let settings = {
        method: 'POST',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api//decks/${id}/eden/create`, settings);
    let datas = await response.json();
    return datas;
}

async function deleteEden(id){
    let settings = {
        method: 'DELETE',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api//decks/${id}/eden/delete`, settings);
    let datas = await response.json();
    return datas;
}


export { getEden, getEdenCards, createEden, deleteEden };