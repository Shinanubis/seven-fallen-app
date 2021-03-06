import dotenv from 'dotenv';
dotenv.config();

async function getTypesList(lang){
    try{
        let settings = {
            method: 'GET'
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/types/all`,settings);

        if(response.status === 200 && response.ok){
            let datas = await response.json();
            return datas.message;
        }

        throw new Error(response.statusText);

    }catch(e){
        return e;
    }
}

async function getRaritiesList(lang){
    try{
        let settings = {
            method: 'GET'
        }
    
        let response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/rarities/all`,settings);

        if(response.status === 200 && response.ok){
            let datas = await response.json();
            return datas.message;
        }

        throw new Error({
            code: response.status,
            message: response.statusText
        });

    }catch(e){
        return e;
    }
}

async function getKingdomsList(lang){
    try{
        let settings = {
            method: 'GET'
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/kingdoms/all`,settings);

        if(response.status === 200 && response.ok){
            let datas = await response.json();
            return datas.message;
        }

        throw new Error({
            code: response.status,
            message: response.statusText
        })

    }catch(e){
        return e;
    }
}

async function getExtensionsList(lang){
    try{
        let settings = {
            method: 'GET',
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/extensions/all`,settings);
        let datas = await response.json();
        return datas.message;

    }catch(e){
        return e;
    }   
}

async function getClassesList(lang, name){
    try {
        let settings = {
            method: 'GET'
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/classes/all?name=${name}`,settings);
        if(response.status !== 200 && !response.ok){
            throw new Error({
                code: response.status,
                message: response.message || response.statusText 
            })
        }
        let datas = await response.json();
        return {
            code: response.status,
            message: datas.message
        };  
    } catch (e) {
        return e;
    }
}

async function getCapacitiesList(lang, name){
    try{
        let settings = {
            method: 'GET'
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/capacities/all?name=${name}`,settings);

        if(response.status !== 200 && !response.ok){
            throw new Error({
                code: response.status,
                message: response.message || response.statusText 
            })
        };

        let datas = await response.json();
        return {
            code: response.status,
            message: datas.message
        };  

    }catch(e){
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
            throw new Error({
                code: response.status,
                message: response.message || response.statusText 
            })
        }
        let datas = await response.json();
        return datas;   
    } catch (e) {
        return e;
    }
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
            throw new Error({
                code: response.status,
                message: response.statusText
            })
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

async function getMultipleId(lang, a){
    try{
        let settings = {
            method:'GET'
        }

        let url = new URL(`${process.env.REACT_APP_BASE_URL_API}/cards/multiple`);

        if(a.length > 0){
            url.searchParams.append("ids", `[${a.join()}]`);
        }
        
        let response = await fetch(url, settings);

        if(response.status !== 200){
            throw new Error({
                code: response.status,
                message: response.statusText
            })
        }
        let datas = await response.json()
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
        let url = new URL(`${process.env.REACT_APP_BASE_URL_API}/cards/all?types=[${id}]&page=${page}&card_count=${count}`);
        if(options.capacities.length > 0){
            url.searchParams.append("capacities", `[${options.capacities}]`);
        }

        if(options.kingdoms.length > 0){
            url.searchParams.append("kingdoms", `[${options.kingdoms.join()}]`)   
        }

        if(options.extensions.length > 0){
            url.searchParams.append("extensions", `[${options.extensions}]`)
        }

        if(options.classes.length > 0){
            url.searchParams.append("classes", `[${options.classes}]`);
        }

        if(options.rarities){
            url.searchParams.append("rarities", `[${options.rarities}]`);
        }

        if(options.name.length > 0){
            url.searchParams.append("name", options.name);
        }

        let response = await fetch(url, settings);
        if(response.status !== 200){
            throw new Error({
                code: response.status,
                message: response.statusText
            })
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
        }
        let url = new URL(`${process.env.REACT_APP_BASE_URL_API}/cards/all?types=[${id}]&card_count=${count}&page=${page}`);
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

async function getDivinities(page, count, lang, typeId){
    try{
        let responseOne = await getCardsByType(page, count, lang, typeId);
        let arrOfIds = [];
        let newDatas = [];

        if(responseOne.code === 200){
            arrOfIds = responseOne.message[1].map(elmt => elmt.id)
        }
        
        let responseTwo = await getMultipleId(lang, arrOfIds);
        if(responseTwo.code === 200){
            newDatas = responseOne.message[1].map(elmt1 => {
                let newObj = {...elmt1};
                // eslint-disable-next-line array-callback-return
                responseTwo.message.map(elmt2 => {
                    if(elmt1.id === elmt2.id){
                       newObj.name = elmt2.name;
                    }
                })
                return newObj;
            })
        }
        return newDatas;
    }catch(e){
        return e;
    }
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
        getCardsByName,
        getMultipleId,
        getDivinities
    };