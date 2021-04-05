
const headers = {
    'Accept': 'application/json'
}



//create User
async function createUser(url,body) {
    let response = await fetch(url,{
         method: 'POST',
         mode:'cors',
         headers: headers,
         body: body
    })

    let data = await response.json();
    return data;
    
}


//get User
async function getUser(url,body){
   let response = await fetch(url,{
        method: 'GET',
        headers,
        body: JSON.stringify(body)
    });
    
    let data = await response.json();

    return data;
}

//getUserByUsername
async function getUserByUsername(url,body){
    let res = await fetch(url,{
         mode: 'cors',
         method: 'POST',
         headers:headers,
         body
    });

    return res;
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
        method: 'PATCH',
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

export {createUser,getUser, getUserByUsername,updateUser,deleteUser,getUsers}; 