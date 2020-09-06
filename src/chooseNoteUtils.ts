import {randomFromArray, shuffle} from "./utils";

export type ContextType<T> = { previousTune: T } | { allTunes: Array<T> } | T | Array<T>;

//deprecated
export function getRandomTuneFromWhoRespect(possibilities: Array<string>, filters: Array<(n1: string, context: ContextType<string>) => boolean>, context: ContextType<string>) {
  return getRandomFromBestsWhoRespect(possibilities, () => 0, filters, context);
}

//deprecated
export function getFirstTuneWhoRespect(possibilities: Array<string>, filters: Array<(n1: string, context: ContextType<string>) => boolean>, context: ContextType<string>) {

  return getFirstFromBestsWhoRespect(possibilities, () => 0, filters, context);
}


export function getRandomTuneFromWhoRespectAll(tunes: Array<string>, possibilities: Array<string>, filters: Array<(n1: string, n2: ContextType<string>) => boolean>) {
  return getRandomFromBestsWhoRespect(possibilities, () => 0, filters, {allTunes: tunes})
}


function getWhoRespect<T>(possibilities: Array<T>, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: { previousTune: T } | { allTunes: Array<T> } | Array<T> | T,) {
  let filtereds: Array<T>;

  if (Array.isArray(context)) {

    getWhoRespect(possibilities, filters, {allTunes: context});
  }
  // @ts-ignore
  else if (context.allTunes) {
    filtereds = possibilities.filter((newTune) => {
        // @ts-ignore
        return filters.every((f) => context.allTunes.every(tune => f(newTune, {previousTune: tune})))
      }
    );
    // @ts-ignore
  } else if (context.previousTune) {
    filtereds = possibilities.filter((newTune) => {
      return filters.every((f) => f(newTune, context))
    });
  } else {
    getWhoRespect(possibilities, filters, {previousTune: context as T});
  }
  return filtereds;
}

export function getBestsWhoRespect<T>(possibilities: Array<T>, evaluate: (a: T) => number, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: ContextType<T>): Array<T> {
  let filtereds = getWhoRespect(possibilities, filters, context);
  return filterMax(filtereds, evaluate);
}


export function getRandomFromBestsWhoRespect<T>(possibilities: Array<T>, evaluate: (a: T) => number, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: ContextType<T>): T {
  return randomFromArray(getBestsWhoRespect(possibilities, evaluate, filters, context))
}

export function getFirstFromBestsWhoRespect<T>(possibilities: Array<T>, evaluate: (a: T) => number, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: ContextType<T>) {
  return getBestsWhoRespect(possibilities, evaluate, filters, context)[0]
}


function filterMax<T>(datas: Array<T>, evaluate: (a: T) => number) {
  if (datas.length > 0) {
    let sorteds = datas.sort((a, b) => evaluate(a) - evaluate(b))


    let max = evaluate(sorteds[0]);
    return datas.filter((d) => evaluate(d) == max)
  } else return []

}


