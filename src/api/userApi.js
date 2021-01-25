
const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

//create User
function createUser(url,body) {
    fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(err => {
        console.log(err)
    })
}


//get User
function getUser(url,body){
   fetch(url,{
        method: 'GET',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(err => {
        console.log(err)
    })
}

//get all Users
function getUsers(){
    fetch('https://test-seven.site/users',{
        method: 'GET',
        headers,
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(err => {
        console.log(err)
    })
}

//update user 
function updateUser(url,body) {
    fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(err => {
        console.log(err)
    })
}

//delete a user
function deleteUser(url,userId) {
    fetch(url,{
        method: 'DELETE',
        headers,
        body: JSON.stringify(...userId)
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(err => {
        console.log(err)
    })
}

export {createUser,getUser,updateUser,deleteUser,getUsers}; 