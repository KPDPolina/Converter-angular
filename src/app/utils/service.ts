export function foundIndex(arrayOfArrays:Array<Array<string | number>>, targetValue: number) {
    let fIndex = -1;
    let i = -1;
    targetValue = Number(targetValue)

    arrayOfArrays.forEach(subArray => {
        i++;
        subArray.forEach(element => {
            if (element === targetValue) {
                fIndex = i;
            }
        });
        if(fIndex !== -1){
            return -1;
        }
    })
    return fIndex;
}

