import dotenv from 'dotenv';
dotenv.config();

async function getTypesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
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
            'Authorization': process.env.REACT_APP_TOKEN
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
            'Authorization': process.env.REACT_APP_TOKEN
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
            'Authorization': process.env.REACT_APP_TOKEN
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
            'Authorization': process.env.REACT_APP_TOKEN
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
            'Authorization': process.env.REACT_APP_TOKEN
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/capacities/all/${lang}?name=a`,settings);
    let datas = await response.json();
    return datas;
}

async function getEdenCards(lang){
    let settings = {
        method:'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
        }
    }
    let url = new URL(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}`);
    url.searchParams.append('types', [4,2,1,9]);
    let response = await fetch(url,settings);
    let datas = await response.json();
    return datas;
}

export { getEdenCards, getTypesList, getRaritiesList, getKingdomsList, getExtensionsList, getClassesList, getCapacitiesList };