export function shuffle(array) {
    let newArray = [...array];
    var currentIndex = newArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }
    return newArray;
}
export function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export function last(array, index = 0) {
    return array[array.length - 1 - index];
}
