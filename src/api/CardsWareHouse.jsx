async function getTypesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API-KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/rarities/all/${lang}`,settings);
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