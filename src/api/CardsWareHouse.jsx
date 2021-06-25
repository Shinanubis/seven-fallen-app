async function getTypesList(lang){
    let settings = {
        method: 'GET'
    }

    let response = await fetch(`https://7fallen.ovh/api/types/all/${lang}`,settings);
    let datas = await response.json();
    return datas;
}

async function getSubdeckCards(options){

    let settings = {
        method:'GET'
    }
    let url = new URL(`https://7fallen.ovh/api/cards/all/${options.lang.toUpperCase()}`);
    url.searchParams.append('type', options.type);
    let response = await fetch(url,settings);
    let datas = await response.json();
    return datas;
}

export { getSubdeckCards, getTypesList };