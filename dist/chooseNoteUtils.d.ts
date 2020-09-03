export declare type ContextType<T> = {
    previousTune: T;
} | {
    allTunes: Array<T>;
} | T | Array<T>;
export declare function getRandomTuneFromWhoRespect(possibilities: Array<string>, filters: Array<(n1: string, context: ContextType<string>) => boolean>, context: ContextType<string>): string;
export declare function getFirstTuneWhoRespect(possibilities: Array<string>, filters: Array<(n1: string, context: ContextType<string>) => boolean>, context: ContextType<string>): string;
export declare function getRandomTuneFromWhoRespectAll(tunes: Array<string>, possibilities: Array<string>, filters: Array<(n1: string, n2: ContextType<string>) => boolean>): string;
export declare function getBestsWhoRespect<T>(possibilities: Array<T>, evaluate: (a: T) => number, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: ContextType<T>): Array<T>;
export declare function getRandomFromBestsWhoRespect<T>(possibilities: Array<T>, evaluate: (a: T) => number, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: ContextType<T>): T;
export declare function getFirstFromBestsWhoRespect<T>(possibilities: Array<T>, evaluate: (a: T) => number, filters: Array<(n1: T, n2: ContextType<T>) => boolean>, context: ContextType<T>): T;
