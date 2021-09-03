let mod = (function () {

  const sortArrayOfObject = function (array = [], elmtToOrder) {
    if (!(array instanceof Array)) {
      throw new TypeError("Should be an Array!");
    }

    if (!elmtToOrder) {
      throw new Error("undefined");
    }

    if (typeof elmtToOrder !== "string") {
      throw new TypeError("Should be a string");
    }

    const keyNameArray = [];
    const newObj = {};
    const newArray = [];

    // Make an array with the key name
    array.map((elmt) => {
      const toLower = elmt[elmtToOrder].toLowerCase();
      return keyNameArray.push(toLower);
    });


    // Remove double
    const newKeyNameArray = Array.from(new Set(keyNameArray));

    //Sort the key name array
    newKeyNameArray.sort();

    //Enter key in order in newObject
    newKeyNameArray.map((elmt) => (newObj[elmt] = {}));

    //Include value from array to the new Object
    array.map((elmt) => {
      if (newObj[elmt[elmtToOrder].toLowerCase()]) {
        newObj[elmt[elmtToOrder].toLowerCase()] = elmt;
      }
    });

    //Include the value in the good order from the newObject to the newArray
    Object.values(newObj).map((elmt) => newArray.push(elmt));
    return newArray;
  };

  const exportToFile = function(datas){
    let cleanDatas = JSON.stringify(datas);

    //create a blob to transform text to bytes
    let blob = new Blob([cleanDatas], {type: 'application/json'});

    //transform blob in url object
    const url = URL.createObjectURL(blob);

    //create a link with download and href attributes
    let elmt = document.createElement("a");
    elmt.href = url;
    elmt.download = 'default.json';

    elmt.click();
    elmt.remove();

    return true;
  }

  return {
    sortArrayOfObject,
    exportToFile
  };
})();

export default mod;