//check for the number of instances of each possible value (1-9) and return in object
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

//check for puzzle completion
export function checkPuzzleFilled(object){
    let status = true

    for(let x in object) {

        if(object[x] !== 9) {
            status = status === true ? false : status
        } 
    }
    
    return status;

}