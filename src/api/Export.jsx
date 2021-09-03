async function getExport(id){
    try{
        let settings = {
            method: 'GET',
            credentials: 'include',
        };
        let response = await fetch(`https://test-seven.site/api/export/${id}`, settings);
        let datas = await response.json();
        return datas;
    }catch(e){
        return e;
    }
}

export {getExport};