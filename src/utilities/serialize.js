export function serialize(arr){
    if(!arr instanceof Array){
        throw TypeError("The serialize function argument should be an Array");
    }

    return arr.toString();
}