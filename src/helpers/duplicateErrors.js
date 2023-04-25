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
                errors.push([x, innerArray[i]])
                errorValues.push(innerArray[i])
            }
        }
    }
    if(errors.length > 0) {
        return(errors);
    } else { return null}
}