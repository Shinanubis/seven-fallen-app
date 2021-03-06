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
    try{    
        let settings = {
            method : 'GET',
            credentials: 'include'
        }
        let url = new URL(`https://test-seven.site/api/decks/${id}/eden/cards`)
        let response = await fetch(url, settings);
        let datas = await response.json();
        return datas;
    }catch(e){
        return e;
    }
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