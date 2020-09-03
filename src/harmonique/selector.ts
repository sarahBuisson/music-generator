import {consonnanceLevel, getLevel, getLevelDegres} from "../harmoniqueUtils";


export function isDissonanteOf(newTune, context) {
  if (context.previousTune)
    return consonnanceLevel(newTune, context.previousTune) < 0
  else
    return consonnanceLevel(newTune, context) < 0

}

export function isConsonnanteOf(newTune, context) {
  if (context.previousTune)
  return consonnanceLevel(newTune, context.previousTune) >= 0
  else
    return consonnanceLevel(newTune, context) >= 0
}

export function isAtMoreThanConsonnanteLevel(numberOfLevelOfConsonnance) {
  return (newTune, context) => {

    return consonnanceLevel(newTune, context.previousTune) <= numberOfLevelOfConsonnance
  }

}

export function isAssendanteOf(newTune:string, context) {
  return getLevel(context.previousTune) < getLevel(newTune)
}

export function isDescendanceOf(newTune:string, context) {
  return getLevel(context.previousTune) > getLevel(newTune)
}

export function isSameSens(noteA:string, noteB:string) {
  if (isAssendanteOf(noteA, {previousTune: noteB}))
    return isAssendanteOf
  else if (isDescendanceOf(noteA, {previousTune: noteB}))
    return isDescendanceOf
  else return (tune2:string, context) => context.previousTune === tune2
}

export function isBeetween(noteA, noteB) {

  let min = getLevel(noteA);
  let max = getLevel(noteB);
  if (min > max) {
    let p = min
    min = max;
    max = p
  }
  return (newTune, context) => {
    let level = getLevel(newTune);
    return min <= level && max >= level
  }
}

export function isDiffOf(tune2, context) {
  return context.previousTune != tune2
}

export function notIn(forbiddenValues: Array<string>) {
  return (newTune, context) => {

    return !forbiddenValues.some((n) => n === newTune)
  }

}

export function isSameOctave(tune2, context) {
  return Math.abs(getLevel(context.previousTune) - getLevel(tune2)) <= 12
}

export function isAtLessThanDegres(numberOfDegre) {
  return (tune2, context) => {
    return Math.abs(getLevel(context.previousTune) - getLevel(tune2)) <= numberOfDegre
  }

}

//TODO : probablement buggée
export function isInIntervalDegres(min = 0, max = 0) {
  return (newTune, context) => {
    let l1 = getLevel(context.previousTune);
    let l2 = getLevel(newTune);
    const intervale = Math.abs(l2 - l1);
    let retour = l2 >= l1 + min && l2 <= l1 + max;
    return retour
  }

}

export function isInIntervalConsonnance(min = -2, max = 2) {
  return (newTune, context) => {
    let interval = consonnanceLevel(newTune, context.previousTune)
    return min <= interval && max >= interval;
  }

}

export function forAll(method) {
  return (newTune, context: { allTunes: Array<string> }) => {
    return context.allTunes.every((tune) => method(newTune, {previousTune: tune}))
  }
}
