import { getRandomFromBestsWhoRespect, getRandomTuneFromWhoRespect } from "./chooseNoteUtils";
import { isAssendanteOf, isAtLessThanDegres, isBeetween, isConsonnanteOf, isDescendanceOf, isDiffOf, isDissonanteOf, isInIntervalDegres, isSameSens } from "./harmonique/selector";
import { randomFromArray } from "./utils";
import { Note } from "./Note";
import { last } from "./utils";
import { consonnanceLevel, getConsonnanceOf, getDissonanceOf, getLevel } from "./harmoniqueUtils";
import { duration } from "./rhythmUtils";
export function fillWithNotesRespecting2(possibilites, rhythme, initTune = "", filters = [], chooseMethode = getRandomFromBestsWhoRespect) {
    let previousTune = initTune;
    const notes = mapMultiLevel(rhythme, (value) => {
        let favorNotes = (n) => consonnanceLevel(previousTune, n);
        const tune = chooseMethode(possibilites, favorNotes, filters, { previousTune });
        const note = new Note(tune, value);
        previousTune = tune;
        return note;
    });
    return notes;
}
export function isStrictlyDescendante(notes) {
    const levels = notes.map(n => getLevel(n));
    return levels.every((n, index) => index >= levels.length || n > levels[index + 1]);
}
export function isStrictlyAscendante(notes) {
    const levels = notes.map(n => getLevel(n));
    return levels.every((n, index) => index >= levels.length || n < levels[index + 1]);
}
export function isMostlyDescendante(notes) {
    const levels = notes.map(n => getLevel(n));
    let numberOfDescendante = levels.filter((n, index) => index >= levels.length || n > levels[index + 1]).length;
    return numberOfDescendante > notes.length / 2 && levels[0] > last(levels);
}
export function isMostlyAscendante(notes) {
    const levels = notes.map(n => getLevel(n));
    let numberOfDescendante = levels.filter((n, index) => index >= levels.length || n < levels[index + 1]).length;
    return numberOfDescendante > notes.length / 2 && levels[0] < last(levels);
}
/* last value is cutted because uncomputable*/
export function computeTuneDerivation(notes) {
    const levels = notes.map(n => getLevel(n));
    let derivation = levels.slice(0, -1).map((n, index) => n - levels[index + 1 % levels.length]);
    return derivation;
}
export function numberOfChangeOfMovement(notes) {
    let derivation = computeTuneDerivation(notes);
    let count = 0;
    derivation.slice(1).forEach((v, index) => {
        let previous = derivation[index - 1];
        return (previous >= 0 && v < 0) || (previous <= 0 && v > 0);
    });
    return count;
}
export function fillWithNotesStrictlyDescendantes(_previousNoteTune, rhythme, possibilites, filters, chooseMethode = getRandomFromBestsWhoRespect) {
    return fillWithNotesRespecting(possibilites, rhythme, _previousNoteTune, [isDescendanceOf], chooseMethode);
}
export function insertDisconnanceAndResolutionAtEnd(notes, possibilites, chooseMethode = getRandomFromBestsWhoRespect) {
    let amorce = last(notes, 2).tune;
    if (isConsonnanteOf(amorce, { previousTune: last(notes, 1).tune })) {
        let dissonante = chooseMethode(possibilites, () => 0, [isDissonanteOf, isSameSens(amorce, last(notes, 1).tune)], { previousTune: amorce });
        if (dissonante)
            last(notes, 1).tune = dissonante;
        insertResolutionAtEndIfNeed(notes, possibilites, chooseMethode);
    }
}
export function insertResolutionAtEndIfNeed(notes, possibilites, chooseMethode = getRandomFromBestsWhoRespect) {
    let dissonante = last(notes, 1).tune;
    let currentLastTune = last(notes, 0).tune;
    let intervalDegres = Math.abs(getLevel(dissonante) - getLevel(currentLastTune));
    if (isDissonanteOf(dissonante, last(notes, 0).tune)) {
        let resolution = chooseMethode(possibilites, () => 0, [isSameSens(last(notes, 1).tune, last(notes).tune), isConsonnanteOf, isInIntervalDegres(-intervalDegres, intervalDegres)], { previousTune: dissonante });
        console.log(dissonante);
        console.log(possibilites);
        console.log(resolution);
        if (!resolution) {
            //then we change the dissonante instead.
            let newDissonante = chooseMethode(possibilites, () => 0, [
                isConsonnanteOf, isBeetween(last(notes, 2).tune, last(notes).tune), isDiffOf
            ], { previousTune: last(notes, 0).tune });
            if (newDissonante)
                last(notes, 1).tune = newDissonante;
        }
        else {
            last(notes, 0).tune = resolution;
        }
    }
}
export function insertConsonnanteAtSecondeBeginingIfNeeded(notes, possibilites, chooseMethode = getRandomTuneFromWhoRespect) {
    let isResolutionDescendante = isDescendanceOf(notes[0].tune, notes[1].tune);
    let dissonante = notes[0].tune;
    let resolution = chooseMethode(possibilites, [isResolutionDescendante ? isDescendanceOf : isAssendanteOf,
        isConsonnanteOf], { previousTune: dissonante });
    notes[1].tune = resolution;
}
export function fillPatternWithNoteDescendantes(_previousNoteTune, mainRhytme, mainNotes, chooseNoteWhoRespect = getRandomTuneFromWhoRespect) {
    let previousPattern;
    return mainRhytme.map((pattern, indexPattern) => {
        let currentNotesTunes = [];
        if (!previousPattern) {
            let previousNoteTune = _previousNoteTune;
            currentNotesTunes.push(previousNoteTune);
            for (let i = 1; i < pattern.length; i++) {
                previousNoteTune = chooseNoteWhoRespect(mainNotes, [isConsonnanteOf, isDescendanceOf, isAtLessThanDegres(6)], previousNoteTune);
                currentNotesTunes.push(previousNoteTune);
            }
        }
        else {
            let previousNoteTune = previousPattern[1].value;
            //  currentNotesTunes.push(previousNoteTune)
            for (let i = 0; i < pattern.length; i++) {
                previousNoteTune = chooseNoteWhoRespect(mainNotes, [isConsonnanteOf, isDescendanceOf], previousNoteTune);
                currentNotesTunes.push(previousNoteTune);
            }
            if (pattern.length >= 2) {
                let currentNotesTune = (pattern.length >= 3) ? currentNotesTunes[pattern.length - 3] : previousPattern[1].value;
                let dissonante = chooseNoteWhoRespect(mainNotes, [isDissonanteOf, isDescendanceOf], { previousTune: currentNotesTune });
                let resolution = chooseNoteWhoRespect(mainNotes, [isConsonnanteOf, isDescendanceOf], { previousTune: dissonante });
                currentNotesTunes[pattern.length - 2] = dissonante;
                currentNotesTunes[pattern.length - 1] = resolution;
            }
        }
        let currentPattern = pattern.map((duration, noteIndex) => {
            return new Note(currentNotesTunes[noteIndex], duration);
        });
        previousPattern = currentPattern;
        return currentPattern;
    });
}
export function flatPartition(form) {
    return form.reduce((a, b) => {
        if (Array.isArray(b)) {
            if (Array.isArray(b[0])) {
                b = flatPartition(b);
            }
        }
        else {
            b = [b];
        }
        if (Array.isArray(a)) {
            if (Array.isArray(a[0])) {
                a = flatPartition(a);
            }
        }
        else {
            a = [a];
        }
        return a.concat(b);
    });
}
export function fillWithRandomNote(mainRhytme, mainNotes) {
    console.log(mainNotes);
    return mapMultiLevel(mainRhytme, duration => {
        console.log(randomFromArray(mainNotes));
        return new Note(randomFromArray(mainNotes), duration);
    });
}
export function fillWithRandomNoteEndedWithDissonanteConsonante(mainRhythme, mainNotes) {
    console.log(mainNotes);
    let result = mainRhythme.map((pattern) => {
        return pattern.map(duration => {
            return new Note(randomFromArray(mainNotes), duration);
        });
    });
    let flat = flatPartition(result);
    console.log(flat);
    if (flat.length >= 2) {
        let consonnance = getConsonnanceOf(last(flat).tune, mainNotes);
        if (!consonnance)
            consonnance = getConsonnanceOf(last(flat).tune);
        flat[1].tune = consonnance;
    }
    if (flat.length >= 3) {
        let dissonance = getDissonanceOf(last(flat, 1).tune, mainNotes);
        if (!dissonance)
            dissonance = getDissonanceOf(last(flat, 1).tune, mainNotes);
        flat[2].tune = dissonance;
    }
    console.log(flat);
    return result;
}
export function mapMultiLevel(array, callback) {
    return array.map((something) => {
        if (Array.isArray(something)) {
            return mapMultiLevel(something, callback);
        }
        else {
            return callback(something);
        }
    });
}
export function fillWithNotesRespecting(possibilites, rhythme, initTune = "", filters = [], chooseMethode = getRandomFromBestsWhoRespect) {
    let previousTune = initTune;
    const notes = mapMultiLevel(rhythme, (value) => {
        const tune = chooseMethode(possibilites, () => 0, filters, { previousTune });
        const note = new Note(tune, value);
        previousTune = tune;
        return note;
    });
    return notes;
}
export function derivationHarmonique(notes) {
    let previous = getLevel(notes[notes.length - 1]);
    return notes.map((n) => {
        let next = getLevel(n);
        let ret = next - previous;
        previous = next;
        return ret;
    }).slice(1);
}
export function derivationRythme(notes) {
    let previous = duration(notes[notes.length - 1]);
    return notes.map((n) => {
        let next = duration(n);
        let ret = next - previous;
        previous = next;
        return ret;
    }).slice(1);
}
export function extremumHarmonique(notes) {
    let derivation = this.derivationHarmonique(notes);
    let previous = derivation[derivation.length - 1];
    return derivation.map((d) => {
        let ret = (previous < 0 && d > 0) || (previous > 0 && d < 0);
        previous = d;
        return ret;
    }).slice(1);
}
export function extremumRhyhtme(notes) {
    let derivation = this.derivationRythme(notes);
    let previous = derivation[derivation.length - 1];
    return derivation.map((d) => {
        let ret = (previous < 0 && d > 0) || (previous > 0 && d < 0);
        previous = d;
        return ret;
    }).slice(1);
}
