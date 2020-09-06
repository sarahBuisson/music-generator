import { randomFromArray } from "./utils";
//deprecated
export function getRandomTuneFromWhoRespect(possibilities, filters, context) {
    return getRandomFromBestsWhoRespect(possibilities, () => 0, filters, context);
}
//deprecated
export function getFirstTuneWhoRespect(possibilities, filters, context) {
    return getFirstFromBestsWhoRespect(possibilities, () => 0, filters, context);
}
export function getRandomTuneFromWhoRespectAll(tunes, possibilities, filters) {
    return getRandomFromBestsWhoRespect(possibilities, () => 0, filters, { allTunes: tunes });
}
function getWhoRespect(possibilities, filters, context) {
    let filtereds;
    if (Array.isArray(context)) {
        getWhoRespect(possibilities, filters, { allTunes: context });
    }
    // @ts-ignore
    else if (context.allTunes) {
        filtereds = possibilities.filter((newTune) => {
            // @ts-ignore
            return filters.every((f) => context.allTunes.every(tune => f(newTune, { previousTune: tune })));
        });
        // @ts-ignore
    }
    else if (context.previousTune) {
        filtereds = possibilities.filter((newTune) => {
            return filters.every((f) => f(newTune, context));
        });
    }
    else {
        getWhoRespect(possibilities, filters, { previousTune: context });
    }
    return filtereds;
}
export function getBestsWhoRespect(possibilities, evaluate, filters, context) {
    let filtereds = getWhoRespect(possibilities, filters, context);
    return filterMax(filtereds, evaluate);
}
export function getRandomFromBestsWhoRespect(possibilities, evaluate, filters, context) {
    return randomFromArray(getBestsWhoRespect(possibilities, evaluate, filters, context));
}
export function getFirstFromBestsWhoRespect(possibilities, evaluate, filters, context) {
    return getBestsWhoRespect(possibilities, evaluate, filters, context)[0];
}
function filterMax(datas, evaluate) {
    if (datas.length > 0) {
        let sorteds = datas.sort((a, b) => evaluate(a) - evaluate(b));
        let max = evaluate(sorteds[0]);
        return datas.filter((d) => evaluate(d) == max);
    }
    else
        return [];
}
