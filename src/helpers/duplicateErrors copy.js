export function hasHorizontalDuplicateValue(array) {
    let errors = []
    for (let x = 0; x < array.length; x++) {
        let innerArray = array[x]
        let errorValues = []
        for (let i = 0; i < innerArray.length; i++) {
            if(errorValues.includes(innerArray[i])) {
                continue;
            }
            if (innerArray.indexOf(innerArray[i]) !== innerArray.lastIndexOf(innerArray[i])) {
                if(innerArray[i] !== null) {
                    errors.push([x, innerArray[i]])
                }
                errorValues.push(innerArray[i])
            }
        }
    }
    //console.log(errors)
    if(errors.length > 0) {
        return(errors);
    } else { return null}
}

export function hasVerticalDuplicateValue(array) {
    let verticalArray = [[], [], [], [], [], [], [], [], []]
    let errors = []
    // convert horizontal array to vertical array
    for (let x = 0; x < array.length; x++) {
        let innerArray = array[x]
        for (let i = 0; i < innerArray.length; i++) {
            verticalArray[i].push(innerArray[i])
        }
    }
    // check for array duplicates
    for (let x = 0; x < verticalArray.length; x++) {
        let innerArray = verticalArray[x]
        let errorValues = []
        for (let i = 0; i < innerArray.length; i++) {
            if(errorValues.includes(innerArray[i])) {
                continue;
            }
            if (innerArray.indexOf(innerArray[i]) !== innerArray.lastIndexOf(innerArray[i])) {
                if(innerArray[i] !== null) {
                    errors.push([x, innerArray[i]])
                }
                errorValues.push(innerArray[i])
            }
        }
    }
    //console.log(errors)
    if(errors.length > 0) {
        return(errors);
    } else { return null}
}

export function hasSectionDuplicateValue(array) {
    let combinedArray = []
    let errorValues = []
    let errors = []
    //combine all 3 arrays into combinedArray
    for (let x = 0; x < array.length; x++) {
        let innerArray = array[x]
        for (let i = 0; i < innerArray.length; i++) {
            combinedArray.push(innerArray[i])
        }
    }
    //check for array duplicates
    for (let i = 0; i < combinedArray.length; i++) {
        if(errorValues.includes(combinedArray[i])) {
            continue;
        }
        if (combinedArray.indexOf(combinedArray[i]) !== combinedArray.lastIndexOf(combinedArray[i])) {
            if(combinedArray[i] !== null) {
                errors.push(combinedArray[i])
            }
            errorValues.push(combinedArray[i])
        }
    }
    //console.log(combinedArray)

    //console.log(errors)
    if(errors.length > 0) {
        return(errors);
    } else { return null}
}
