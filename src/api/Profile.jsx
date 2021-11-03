import dotenv from 'dotenv';
dotenv.config();

async function getProfile(){
    try{
        let settings = {
            method : 'GET',
            credentials: 'include'
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile`, settings);
        let datas = response.json();
        return datas;
    }catch(e){
        return e;
    }
}

async function updateProfile(options){
    try{
        let form = new FormData();
        if(options){
            form.append('avatar', options.avatar);
            form.append('username', options.username);
        }else{
            throw new Error({
                code: 502,
                message: "Payload Not Compliant"
            })
        }
        
        let settings = {
            method: 'PATCH',
            credentials: 'include',
            body: form
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile`, settings);
        let datas = await response.json();
        return datas;
    }catch(e){
        return e;
    }
}

async function deleteProfile(){
    try{
        let settings = {
            method: 'DELETE',
            credentials: 'include',
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile`, settings);
        let datas = await response.json();
        return datas;
    }catch(e){
        return e;
    }
}

async function getAvatar(){
    let settings = {
        method: 'GET',
        credentials: 'include'
    }

    let response = await fetch('https://test-seven.site/api/profile/avatar', settings);
    let datas = await response.json();
    return datas;
 
}

async function addAvatar(form){
    let settings = {
        method : 'POST',
        credentials: 'include',
        body: form
    } 
    
    let response = await fetch('https://test-seven.site/api/profile/avatar', settings);
    let datas = await response.json();
    return datas;
}

export {
    getProfile, 
    updateProfile, 
    deleteProfile, 
    getAvatar, 
    addAvatar
}