function filterById(arr,id, property){
    
    if(arr instanceof Array && property){
        let result = arr.filter(elmt => elmt.id == id);
        return result[0][property];
    }

    if(arr instanceof Array){
        return arr.filter(elmt => elmt.id == id)[0];
    }
    
    throw new TypeError('Parameter is not a number!'); 
}

export default filterById; 