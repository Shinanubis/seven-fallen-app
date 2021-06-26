async function getTypesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/types/all/${lang}`,settings);
    let datas = await response.json();
    return datas;
}

async function getRaritiesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/rarities/all/${lang}`,settings);
    let datas = await response.json();
    return datas;
}

async function getKingdomsList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/kingdoms/all/${lang}`,settings);
    let datas = await response.json();
    return datas;
}

async function getExtensionsList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/extensions/all/${lang}`,settings);
    let datas = await response.json();
    return datas;
}

async function getClassesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/classes/all/${lang}?name=m`,settings);
    let datas = await response.json();
    return datas;
}

async function getCapacitiesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/capacities/all/${lang}?name=a`,settings);
    let datas = await response.json();
    return datas;
}

async function getSubdeckCards(options){

    let settings = {
        method:'GET',
        headers: {
            'Authorization': 'API_KEY eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJzaXRlX25hbWUiOiJEZXZTb2xkaWVyIHRlc3RlcyIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC1zZXZlbi5zaXRlIn0.gF2HGtXAC5z6s-aP_AKrQ3IVFCu5MYFSeZK-wahZikA'
        }
    }
    let url = new URL(`https://api.7fallen.ovh/api/cards/all/${options.lang.toUpperCase()}?page=1`);
    let response = await fetch(url,settings);
    let datas = await response.json();
    return datas;
}

export { getSubdeckCards, getTypesList, getRaritiesList, getKingdomsList, getExtensionsList, getClassesList, getCapacitiesList };