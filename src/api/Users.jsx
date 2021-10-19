import dotenv from 'dotenv';
dotenv.config();

async function getAllUsers(){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api/users`, settings);
    let datas = await response.json();
    return datas;
}

export {
    getAllUsers
}