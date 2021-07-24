import dotenv from 'dotenv';
dotenv.config();

async function getAuthUser(){
    let response = await fetch(process.env.REACT_APP_BASE_URL + "/api/auth/user",{
        method: 'GET',
        credentials: "include" 
    });
    let data = await response.json();
    return {
        code: response.status,
        ...data
    };
}

export {
    getAuthUser
}