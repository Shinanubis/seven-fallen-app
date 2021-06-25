async function getProfile(){
    let settings = {
        method : 'GET',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/api/profile`, settings);
    let datas = response.json();
    return datas;
}

async function updateProfile(form){
    let settings = {
        method: 'PATCH',
        credentials: 'include',
        body: form
    }

    let response = await fetch('https://test-seven.site/api/user/update', settings);
    console.log(response)
    let datas = await response.json();
    return datas;
}

export {getProfile, updateProfile}