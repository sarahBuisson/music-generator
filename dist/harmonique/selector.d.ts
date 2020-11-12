export declare function isDissonanteOf(newTune: any, context: any): boolean;
export declare function isConsonnanteOf(newTune: any, context: any): boolean;
export declare function isAtMoreThanConsonnanteLevel(numberOfLevelOfConsonnance: any): (newTune: any, context: any) => boolean;
export declare function isAssendanteOf(newTune: string, context: any): boolean;
export declare function isDescendanceOf(newTune: string, context: any): boolean;
export declare function isSameSens(noteA: string, noteB: string): typeof isDescendanceOf;
export declare function isBeetween(noteA: any, noteB: any): (newTune: any, context: any) => boolean;
export declare function isDiffOf(tune2: any, context: any): boolean;
export declare function notIn(forbiddenValues: Array<string>): (newTune: any, context: any) => boolean;
export declare function isSameOctave(tune2: any, context: any): boolean;
export declare function isAtLessThanDegres(numberOfDegre: any): (tune2: any, context: any) => boolean;
export declare function isInIntervalDegres(min?: number, max?: number): (newTune: any, context: any) => boolean;
export declare function isInIntervalConsonnance(min?: number, max?: number): (newTune: any, context: any) => boolean;
export declare function forAll(method: any): (newTune: any, context: {
    allTunes: Array<string>;
}) => boolean;
