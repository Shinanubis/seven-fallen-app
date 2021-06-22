async function getHolyBook(id){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }
    
    let response = await fetch(`https://test-seven.site/decks/${id}/holybook`,settings);
    let datas = await response.json();
    return datas;
}

export { getHolyBook };