async function getProfile(){
    let settings = {
        method : 'GET',
        credentials: 'include'
    }

    let response = await fetch(`https://test-seven.site/profile`, settings);
    let datas = response.json();
    return datas;
}

export {getProfile}