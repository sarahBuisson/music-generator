import { Note } from "./Note";
export declare const instrumentSamples: {
    flute: () => any;
    pianoOld: () => any;
    trompette: () => any;
    hautbois: () => any;
    piano: () => any;
    something: any;
    goodPiano: () => any;
    likeAPiano: () => any;
    som: () => any;
};
export declare function playNote(instrument: any, note: Note, now: number, tempo?: number): number;
export declare function play(partition: Array<any>, tempo?: number): void;
/**
 * convert to tone class "Part"
 * @param instrument
 * @param partition
 */
export declare function toTonePart(instrument: any, partition: Array<any>, tempo?: number): any;
