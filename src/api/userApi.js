
const headers = {
    'Accept': 'application/json'
}

// async function ajaxCall(settings){
//         let data = null;
//         let response = await fetch(settings.url,{
//             method: settings.method,
//             mode: settings.mode,
//             headers: settings.headers,
//             body: settings.payload
//         });
//         data = await response.json();
//         return data;

// }

//create User
async function createUser(url,body) {
    let response = await fetch(url,{
         method: 'POST',
         mode:'cors',
         headers: headers,
         body: body
    })

    let data = await response.json();
    console.log(data);
    return data;
}


//get User
async function getUser(url,body){
   let response = fetch(url,{
        method: 'GET',
        headers,
        body: JSON.stringify(body)
    });
    
    let data = response.json();
    return data;
}

//get all Users
async function getUsers(){
    let response = await fetch('https://test-seven.site/users',{
        method: 'GET',
        headers,
    });
    let data = response.json();
    return data;
}

//update user 
async function updateUser(url,body) {
    let response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    })
    let data = response.json();
    return data;
}

//delete a user
async function deleteUser(url,userId) {
    let response = await fetch(url,{
        method: 'DELETE',
        headers,
        body: JSON.stringify(...userId)
    });

    let data = await response.json();
    return data;
}

export {createUser,getUser,updateUser,deleteUser,getUsers}; 