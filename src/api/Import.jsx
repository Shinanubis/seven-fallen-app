async function uploadDeck(options){
    try{
        let form = new FormData();
        if(options.file){
            form.append('file', options.file);
        }

        let settings = {
            method: 'POST',
            credentials: 'include',
            body: form
        };

        let response = await fetch(`https://test-seven.site/api/import/${options.id}`, settings);
        let datas = await response.json();
        return datas;

    }catch(e){
        return e;
    }
}   

export {
    uploadDeck
}