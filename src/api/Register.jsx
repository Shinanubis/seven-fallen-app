async function getRegister(id){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }
    
    let response = await fetch(`https://test-seven.site/api/decks/${id}/register`,settings);
    let datas = await response.json();
    return datas;
}

async function createRegister(id){

    let settings = {
        method: 'POST',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api//decks/${id}/register/create`, settings);
    let datas = await response.json();
    return datas;
}

export { getRegister, createRegister };