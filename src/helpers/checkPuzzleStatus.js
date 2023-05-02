export function checkPuzzleStatus(array) {
    let combinedArray = []
    for(let i = 0; i < array.length; i++) {
        const innerArray = array[i]
        for(let j = 0; j < innerArray.length; j++) {
            combinedArray.push(innerArray[j])
        }
    }
    const numberCounts = {}

    for(let num of combinedArray) {
        numberCounts[num] = numberCounts[num] ? numberCounts[num] + 1 : 1
    }
    return numberCounts
}

export function checkComplete(object){
    if(object[null]) {
        return false;
    }
    return true;
}