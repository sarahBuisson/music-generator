import { randomFromArray } from "./utils";
export function randomRhythmOfSize(size, patterns = this.availablePattern) {
    let freePlace = size;
    let rhythm = new Array();
    while (freePlace > 0) {
        let newPattern = randomFromArray(patterns.filter((p) => this.durationArray(p) <= freePlace));
        if (!newPattern) {
            break;
        }
        freePlace -= this.durationArray(newPattern);
        rhythm.push(newPattern);
    }
    return rhythm;
}
export function duration(notes) {
    let smallest = 16;
    let unit = 4; //1 tmp==1 noire
    if (Array.isArray(notes))
        return notes.map((note) => {
            return durationPartial(note);
        }).reduce((a, b) => a + b) * unit / smallest;
    else {
        return durationPartial(notes) * unit / smallest;
    }
}
/**
 * do not export
 * @param note
 * @param smallest
 */
function durationPartial(note, smallest = 16) {
    let split = note.split('n');
    let result = smallest / parseInt(split[0]);
    if (split.length > 1 && split[1] == '.') {
        result *= 1.5;
    }
    return result;
}
