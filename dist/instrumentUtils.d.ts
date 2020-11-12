import * as tone from 'tone';
import { Note } from "./Note";
export declare const instrumentSamples: {
    flute: () => tone.PolySynth<tone.MonoSynth>;
    pianoOld: () => tone.FMSynth;
    trompette: () => tone.FMSynth;
    hautbois: () => tone.PolySynth<tone.MonoSynth>;
    piano: () => tone.AMSynth;
    something: tone.AMSynth;
    goodPiano: () => tone.AMSynth;
    likeAPiano: () => tone.AMSynth;
    som: () => tone.AMSynth;
};
export declare function playNote(instrument: any, note: Note, now: number, tempo?: number): number;
export declare function play(partition: Array<any>, tempo?: number): void;
export declare function toTonePart(instrument: any, partition: Array<any>, tempo?: number): tone.Part<(number | Note)[]>;
