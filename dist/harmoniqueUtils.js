//do d ré d mi fa
import { getRandomTuneFromWhoRespect } from "./chooseNoteUtils";
import { isConsonnanteOf, isDiffOf, isDissonanteOf } from "./harmonique/selector";
export const GAME = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const TUNES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export function getTierceMajeur(tune) {
    let currentIndex = getLevel(tune);
    let nextIndex = currentIndex + 4;
    return getTuneAt(nextIndex);
}
export function getTierceMinor(tune) {
    let currentIndex = getLevel(tune);
    let nextIndex = currentIndex + 3 + 1;
    return getTuneAt(nextIndex);
}
export function getQuinte(tune) {
    let currentIndex = getLevel(tune);
    let nextIndex = currentIndex + 6 + 1;
    return getTuneAt(nextIndex);
}
export function getSept(tune) {
    let currentIndex = getLevel(tune);
    let nextIndex = currentIndex + 9 + 1;
    return getTuneAt(nextIndex);
}
export function getNeuf(tune) {
    let currentIndex = getLevel(tune);
    let nextIndex = currentIndex + 9 + 1;
    return getTuneAt(nextIndex);
}
export function getTuneAt(nextIndex) {
    return GAME[(nextIndex) % GAME.length] + Math.floor(nextIndex / GAME.length);
}
export function getLevel(tune1) {
    let base1 = tune1.substring(0, tune1.length - 1);
    let game1 = tune1.slice(-1);
    let i1 = GAME.indexOf(base1) + GAME.length * parseInt(game1);
    return i1;
}
export function getLevelDegres(tune1) {
    let base1 = tune1[0];
    let game1 = tune1.slice(-1);
    let i1 = TUNES.indexOf(base1) + TUNES.length * parseInt(game1);
    return i1;
}
export function intervaleDemiTon(tune1, tune2) {
    let i1 = getLevel(tune1);
    let i2 = getLevel(tune2);
    return i2 - i1;
}
export function intervaleDegres(tune1, tune2) {
    let i1 = getLevelDegres(tune1);
    let i2 = getLevelDegres(tune2);
    return i2 - i1;
}
//Todo : tritone, perfect fourht
export function consonnanceLevel(tune1, tune2) {
    const dissonanceSharp = -2;
    const dissonance = -1;
    const mixte = 0;
    const consonnanceimparfaite = 1;
    const consonnanceParfaite = 2;
    let demiTonNumber = Math.abs(intervaleDemiTon(tune1, tune2));
    let degresNumber = Math.abs(intervaleDegres(tune1, tune2));
    if (demiTonNumber == 3) {
        return dissonance; //triton //maybe should be mixte
    }
    if (demiTonNumber == 1 || demiTonNumber == 2) {
        return dissonanceSharp; //secondes
    }
    if (demiTonNumber == 10 || demiTonNumber == 11) {
        return dissonance; //Septieme
    }
    if (degresNumber == 3) {
        return consonnanceimparfaite; //tierce
    }
    if (degresNumber == 6) {
        return consonnanceimparfaite; //sixte
    }
    if (degresNumber == 4) {
        if (demiTonNumber == 5) {
            //perfect forth; consonnante or disonante following the context
        }
        return 0; //quarte
    }
    if (degresNumber == 5) {
        if (demiTonNumber == 7) {
            return consonnanceParfaite; //quinte juste
        }
        else {
            return 0; //quinte
        }
    }
    if (demiTonNumber == 12) {
        return consonnanceParfaite; //octabe
    }
    if (demiTonNumber == 0) {
        return consonnanceParfaite; //unisson
    }
    return 0;
}
export function randomTune() {
    let index = Math.round(GAME.length * Math.random());
    return GAME[index] + 3;
}
export function getDissonanceOf(tune, possibilites = GAME.map(n => n + getGameNumber(tune))) {
    return getRandomTuneFromWhoRespect(possibilites, [isDissonanteOf, isDiffOf], { previousTune: tune });
}
export function getGameNumber(tune) {
    return parseInt(tune.slice(-1));
}
export function getConsonnanceOf(tune, possibilites = GAME.map(n => n + getGameNumber(tune))) {
    return getRandomTuneFromWhoRespect(possibilites, [isConsonnanteOf, isDiffOf], { previousTune: tune });
}
export function getPerfectChord(tune) {
    return [tune, getTierceMinor(tune), getQuinte(tune), getSept(tune), getNeuf(tune)];
}
export function getSuroundingTunes(tunes) {
    let levels = tunes.map(getLevel);
    let min = levels.reduce((n, n1) => n < n1 ? n : n1);
    let max = levels.reduce((n, n1) => n > n1 ? n : n1);
    return getTunesBeetween(getTuneAt(min), getTuneAt(max)).concat(getTuneAt(min), getTuneAt(max));
}
export function getTunesBeetween(tuneMin, tuneMax) {
    let min = getLevel(tuneMin) + 1;
    let max = getLevel(tuneMax) - 1;
    const result = [];
    for (let i = min; i <= max; i++) {
        result.push(getTuneAt(i));
    }
    return result;
}
export function getNNextDescendante(tune = GAME[GAME.length] + 3, n = GAME.length) {
    let init = getLevel(tune);
    let tunes = [];
    for (let i = 0; i < n; i++)
        tunes.push(getTuneAt(init - i));
    return tunes;
}
export function getNNextAscendente(tune = GAME[0] + 3, n = GAME.length) {
    let init = getLevel(tune);
    let tunes = [];
    for (let i = 0; i < n; i++)
        tunes.push(getTuneAt(init + i));
    return tunes;
}
