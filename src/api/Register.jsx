async function getRegister(id){
    let settings = {
        method: 'GET',
        credentials: 'includes'
    }
    
    let response = await fetch(`https://test-seven.site/decks/${id}/register`,settings);
    let datas = await response.json();
    return datas;
}

export { getRegister };