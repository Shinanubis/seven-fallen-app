import dotenv from 'dotenv';
dotenv.config();

async function getAllUsers(options){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }

    let url = new URL(process.env.REACT_APP_BASE_URL + "/api/users");

    if(options.page){
        url.searchParams.append('page', options.page)
    }

    if(options.size){
        url.searchParams.append('size', options.size)
    }

    let response = await fetch(url, settings);
    let datas = await response.json();
    return datas;
}

export {
    getAllUsers
}