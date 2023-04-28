export function checkDuplicate(array, sectionArray, row, col, n) {
    let combinedArray = []
    //combine section arrays into single combinedArray
    for (let x = 0; x < sectionArray.length; x++) {
        let innerArray = sectionArray[x]
        for (let i = 0; i < innerArray.length; i++) {
            combinedArray.push(innerArray[i])
        }
    }
    //check for row duplicates
    if (n !== null && array[row].indexOf(n) !== array[row].lastIndexOf(n)) {
        return true;
    }
    //check for column duplicates
    let columnValues = array.map(row => row[col]);
    if (n !== null && columnValues.indexOf(n) !== columnValues.lastIndexOf(n)) {
        return true;
    }
    //check for section (combinedArray) duplicates
    if (n !== null && combinedArray.indexOf(n) !== combinedArray.lastIndexOf(n)) {
        return true;
    }
    
    return false;
}