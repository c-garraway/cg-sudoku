export function addPuzzleMask (puzzle, level) { //puzzle is 2d array, level = 0, 1, 2
    const levelRange = [ {min: 3, max: 4}, {min: 3, max: 6}, {min: 4, max: 7} ]

    function determineMaskValue(level) {
        const max = levelRange[level].max
        const min = levelRange[level].min
        let randomMaskValue = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomMaskValue;
    }

    for (let x = 0; x < puzzle.length; x++) {
        let innerArray = puzzle[x]

        //determine maskValue
        const maskValue = determineMaskValue(level)
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        //determine random index number to push null to
        let randomIndexNumbers = numbers.sort(() => Math.random() - maskValue/10).slice(0, maskValue);
        console.log(randomIndexNumbers)
        for (let j = 0; j < randomIndexNumbers.length; j++) {
            //push null to the randomIndexNumbers of the innerArray
            innerArray[randomIndexNumbers[j]] = null
        }
    }
    console.log(puzzle)

    return puzzle
}