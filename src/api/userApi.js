
const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

//create User
async function createUser(url,body) {
    console.log(body)
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

export {createUser}; 