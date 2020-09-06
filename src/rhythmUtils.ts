import {randomFromArray} from "./utils";
import {getLevel} from "./harmoniqueUtils";

export function randomRhythmOfSize(size: number, patterns = this.availablePattern): Array<Array<string>> {
    let freePlace = size;
    let rhythm = new Array<Array<string>>()
    while (freePlace > 0) {
        let newPattern: Array<string> = randomFromArray(patterns.filter((p) => this.durationArray(p) <= freePlace))
        if (!newPattern) {
            break;
        }
        freePlace -= this.durationArray(newPattern);
        rhythm.push(newPattern);
    }
    return rhythm;
}

export function duration(notes: Array<string> | string): number {
  let smallest = 16;
  let unit = 4;//1 tmp==1 noire
  if (Array.isArray(notes))
    return notes.map((note) => {
      return durationPartial(note);

    }).reduce((a, b) => a + b) * unit / smallest

  else {
    return durationPartial(notes) * unit / smallest;


  }
}

/**
 * do not export
 * @param note
 * @param smallest
 */
function durationPartial(note: string, smallest: number = 16): number {
  let split = note.split('n')

  let result = smallest / parseInt(split[0])
  if (split.length > 1 && split[1] == '.') {
    result *= 1.5
  }

  return result
}

