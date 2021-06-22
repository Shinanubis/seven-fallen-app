async function getRegister(id){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }
    
    let response = await fetch(`https://test-seven.site/api/decks/${id}/register`,settings);
    let datas = await response.json();
    return datas;
}

export { getRegister };