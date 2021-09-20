import dotenv from 'dotenv';
dotenv.config();

async function getTypesList(lang){
    try{
        let settings = {
            method: 'GET',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }

        }

        let response = await fetch(`https://api.7fallen.ovh/api/types/all/${lang.toUpperCase()}`,settings);
        if(response.status !== 200 && !response.ok){
            throw {
                code: response.status,
                message: response.message || response.statusText 
            }
        }
        let datas = await response.json();
        return datas;
    }catch(e){
        return e;
    }
}

async function getRaritiesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/rarities/all/${lang.toUpperCase()}`,settings);
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

    let response = await fetch(`https://api.7fallen.ovh/api/kingdoms/all/${lang.toUpperCase()}`,settings);
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

    let response = await fetch(`https://api.7fallen.ovh/api/extensions/all/${lang.toUpperCase()}`,settings);
    let datas = await response.json();
    return datas;
}

async function getClassesList(lang, name){
    try {
        let settings = {
            method: 'GET',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }

        }

        let response = await fetch(`https://api.7fallen.ovh/api/classes/all/${lang.toUpperCase()}?name=${name}`,settings);
        if(response.status !== 200 && !response.ok){
            throw {
                code: response.status,
                message: response.message || response.statusText 
            }
        }
        let datas = await response.json();
        return {
            code: response.status,
            message: datas
        };  
    } catch (e) {
        return e;
    }
}

async function getCardsByName(lang, name, page, count, type){
    try {
        let settings = {
            method: 'GET',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }

        }

        let response = await fetch(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}?name=${name}&page=${page}&card_count=${count}&types=[${type}]`,settings);
        if(response.status !== 200 && !response.ok){
            throw {
                code: response.status,
                message: response.message || response.statusText 
            }
        }
        let datas = await response.json();
        return datas;   
    } catch (e) {
        return e;
    }
}

async function getCapacitiesList(lang){
    let settings = {
        method: 'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
        }

    }

    let response = await fetch(`https://api.7fallen.ovh/api/capacities/all/${lang.toUpperCase()}?name=a`,settings);
    let datas = await response.json();
    return datas;
}

async function getEdenCards(page,count,lang){
    let settings = {
        method:'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
        }
    }
    let url = new URL(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}?types=[1,2,3]&card_count=${count}&page=${page}`);
    let response = await fetch(url,settings);
    let datas = await response.json();
    return {
        code: response.status,
        message: datas
    };
}

async function getCardById(){
    try{
        let settings = {
            method:'GET',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        }
        let url = new URL(`https://api.7fallen.ovh/api/cards/6/FR`);
        let response = await fetch(url,settings);
        if(response.status !== 200){
            throw {
                code: response.status,
                message: response.statusText
            }
        }
        let datas = await response.json();
        return {
            code: response.status,
            message: datas
        };
    }catch(e){
        return e;
    }
}

async function getCardsByMultipleOption(page, count, lang, options, id){
    try{
        let settings = {
            method:'GET',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        }
        let url = new URL(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}?types=[${id}]&page=${page}&card_count=${count}`);


        if(options.kingdoms.length > 0){
            url.searchParams.append("kingdoms", options.kingdoms)   
        }

        if(options.classes.length > 0){
            url.searchParams.append("classes", options.classes);
        }

        if(options.name.length > 0){
            url.searchParams.append("name", options.name);
        }

        let response = await fetch(url, settings);
        if(response.status !== 200){
            throw {
                code: response.status,
                message: response.statusText
            }
        }
        let datas = await response.json();
        return {
            code: response.status,
            message: datas
        };

    }catch(e){
        return e;
    }
}

async function getCardsByType(page, count, lang, id){
        let settings = {
            method:'GET',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        }
        let url = new URL(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}?types=[${id}]&card_count=${count}&page=${page}`);
        let response = await fetch(url,settings);
        let datas = await response.json();
        return {
            code: response.status,
            message: datas
        };  
}

async function getRegisterCards(page,count,lang){
    let settings = {
        method:'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
        }
    }
    let url = new URL(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}?types=[8]&card_count=${count}&page=${page}`);
    let response = await fetch(url,settings);
    let datas = await response.json();
    return {
        code: response.status,
        message: datas
    };
}

async function getHolyBookCards(page,count,lang){
    let settings = {
        method:'GET',
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN
        }
    }
    let url = new URL(`https://api.7fallen.ovh/api/cards/all/${lang.toUpperCase()}?types=[4,5,6,7,9]&card_count=${count}&page=${page}`);
    let response = await fetch(url,settings);
    let datas = await response.json();
    return {
        code: response.status,
        message: datas
    };
}

export { 
        getEdenCards,
        getRegisterCards,
        getHolyBookCards,
        getTypesList, 
        getRaritiesList, 
        getKingdomsList, 
        getExtensionsList, 
        getClassesList, 
        getCapacitiesList,
        getCardsByType,
        getCardById,
        getCardsByMultipleOption,
        getCardsByName 
    };