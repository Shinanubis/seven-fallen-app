async function getEden(id){

    let settings = {
        method: 'GET',
        credentials: 'include'
    }
    
    let response = await fetch(`https://test-seven.site/decks/${id}/eden`,settings);
    let datas = await response.json();
    return datas;
}


export { getEden };