function createHashTable(array) {
    const hashTable = {};
    array.forEach((element, index) => {
        hashTable[element] = index;
    });
    return hashTable;
}

function searchInHashTable(hashTable, target) {
    return hashTable[target] !== undefined ? hashTable[target] : -1;
}

export function SearchThis(array, target) {
    const hashtable = createHashTable(array)
    return searchInHashTable(hashtable, target)
}

export function SearchObjectByKey(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i]; // Return the object if the key-value pair matches
        }
    }
    return null; // Return null if no matching object is found
}