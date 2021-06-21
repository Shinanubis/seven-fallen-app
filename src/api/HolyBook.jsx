async function getHolyBook(id){
    let settings = {
        method: 'GET',
        credentials: 'includes'
    }
    
    let response = await fetch(`https://test-seven.site/decks/${id}/holybook`,settings);
    let datas = await response.json();
    return datas;
}

export { getHolyBook };