async function getSubdeckCards(options){
    let settings = {
        method:'GET'
    }
    let url = new URL(`https://7fallen.ovh/api/cards/all/${options.lang.toUpperCase()}`);
    url.searchParams.append('type', options.type);
    console.log(url)
    let response = await fetch(url,settings);
    let datas = await response.json();
    return datas;
}

export { getSubdeckCards };