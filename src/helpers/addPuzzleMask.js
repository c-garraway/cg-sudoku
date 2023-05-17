export function addPuzzleMask(puzzle, level) {
    const levelRange = [
        { min: 2, max: 4 },
        { min: 3, max: 5 },
        { min: 4, max: 6 },
    ];

    function determineMaskValue(level) {
        const max = levelRange[level].max;
        const min = levelRange[level].min;
        let randomMaskValue =
            Math.floor(Math.random() * (max - min + 1)) + min;
        return randomMaskValue;
    }

    // Create a new array to store the result
    let result = [];

    for (let x = 0; x < puzzle.length; x++) {
        let innerArray = [...puzzle[x]];

        // Determine maskValue
        const maskValue = determineMaskValue(level);

        // Determine random index number to push null to
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        shuffleArray(numbers);
        let randomIndexNumbers = numbers.slice(0, maskValue);
        console.log(randomIndexNumbers)
        for (let j = 0; j < randomIndexNumbers.length; j++) {
            // Push null to the randomIndexNumbers of the innerArray
            innerArray[randomIndexNumbers[j]] = null;
        }

        // Add the modified innerArray to the result array
        result.push(innerArray);
    }

    return result;
}

