// @ts-ignore
import * as tone from 'tone';
import {Note} from "./Note";
import {duration} from "./rhythmUtils";
import {flatPartition} from "./compositionUtils";
import {AMSynthOptions} from "tone";


export function instrumentSamplesInit() {
    console.log("init instrument")
    return {


        flute: () => new tone.PolySynth(tone.MonoSynth, {
            volume: -8,
            oscillator: {
                type: "square8"
            },
            envelope: {
                attack: 0.05,
                decay: 0.3,
                sustain: 0.4,
                release: 0.8,
            },
            filterEnvelope: {
                attack: 0.001,
                decay: 0.7,
                sustain: 0.1,
                release: 0.8,
                baseFrequency: 300,
                octaves: 4
            }
        }),
        pianoOld: () => new tone.FMSynth({
            "volume": 0,
            "detune": 0,
            "portamento": 5,
            "harmonicity": 10,
            "oscillator": {
                "partialCount": 0,
                "phase": 0,
                "type": "sine"
            },
            "envelope": {
                "attack": 0.01,
                "attackCurve": "linear",
                "decay": 0.9,
                "decayCurve": "exponential",
                "release": 0.1,
                "releaseCurve": "exponential",
                "sustain": 0
            },
            "modulation": {
                "partialCount": 0,
                "phase": 0,
                "type": "square"
            },
            "modulationEnvelope": {
                "attack": 0.02,
                "attackCurve": "linear",
                "decay": 0.8,
                "decayCurve": "exponential",
                "release": 0.01,
                "releaseCurve": "exponential",
                "sustain": 1
            },
            "modulationIndex": 0.22
        }),

        trompette: () => new tone.FMSynth({
            modulationIndex: 12.22,
            envelope: {
                attack: 0.01,
                decay: 0.5
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.2,
                decay: 0.05
            }
        }),

        hautbois: () => new tone.PolySynth(tone.MonoSynth, {
            volume: -8,
            oscillator: {
                type: "square8"
            },
            envelope: {
                attack: 0.02,
                decay: 0.5,
                sustain: 0.01,
                release: 0.2,
            },
            filterEnvelope: {
                attack: 0.02,
                decay: 0.5,
                sustain: 0.01,
                release: 0.2,
                baseFrequency: 300,
                octaves: 4
            }
        }),

        piano: () => new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "sawtooth7"
            },
            envelope: {
                attack: 0.02,
                decay: 0.4,
                sustain: 0.15,
                release: 0.01
            },
            modulation: {
                type: "sawtooth"//square //sine
            },
            modulationEnvelope: {
                attack: 1.5,
                decay: 0.0501,
                // sustain: 1,
            }

        }),

        something: new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "sawtooth7"
            },
            envelope: {
                attack: 0.02,
                decay: 0.6,
                sustain: 0.1,
                release: 0.1
            },
            modulation: {
                type: "sawtooth"//square //sine
            },
            modulationEnvelope: {
                attack: 1,
                decay: 0.501
            }

        } as AMSynthOptions),


        goodPiano: () => new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "sawtooth7"
            },
            envelope: {
                attack: 0.01,
                decay: 0.6,
                sustain: 0.02,
                release: 0.03
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 1,
                decay: 0.501
            }
        } as AMSynthOptions),

//look a lot like a piano
        likeAPiano: () => new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "fatsawtooth3"
            },
            envelope: {
                attack: 0.0,
                decay: 0.6,
                sustain: 0.02,
                release: 0.3
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.5,
                decay: 0.01
            }
        } as AMSynthOptions),

        som: () => new tone.AMSynth({
            "volume": 1,
            "detune": 1,
            "portamento": 0,
            "harmonicity": 2.5,
            "oscillator": {
                "phase": 0,
                "type": "fatsawtooth",
                "count": 3,
                "spread": 20
            },
            "envelope": {
                "attack": 0.1,
                "attackCurve": "linear",
                "decay": 0.2,
                "decayCurve": "exponential",
                "release": 0.3,
                "releaseCurve": "exponential",
                "sustain": 0.2
            },
            "modulation": {
                "partialCount": 0,
                "phase": 0,
                "type": "square"
            },
            "modulationEnvelope": {
                "attack": 0.5,
                "attackCurve": "linear",
                "decay": 0.01,
                "decayCurve": "exponential",
                "release": 0.5,
                "releaseCurve": "exponential",
                "sustain": 1
            }
        })
    }
}

class InstrumentSample {


    get flute() {
        return new tone.PolySynth(tone.MonoSynth, {
            volume: -8,
            oscillator: {
                type: "square8"
            },
            envelope: {
                attack: 0.05,
                decay: 0.3,
                sustain: 0.4,
                release: 0.8,
            },
            filterEnvelope: {
                attack: 0.001,
                decay: 0.7,
                sustain: 0.1,
                release: 0.8,
                baseFrequency: 300,
                octaves: 4
            }
        })
    };

    get pianoOld() {
        return new tone.FMSynth({
            "volume": 0,
            "detune": 0,
            "portamento": 5,
            "harmonicity": 10,
            "oscillator": {
                "partialCount": 0,
                "phase": 0,
                "type": "sine"
            },
            "envelope": {
                "attack": 0.01,
                "attackCurve": "linear",
                "decay": 0.9,
                "decayCurve": "exponential",
                "release": 0.1,
                "releaseCurve": "exponential",
                "sustain": 0
            },
            "modulation": {
                "partialCount": 0,
                "phase": 0,
                "type": "square"
            },
            "modulationEnvelope": {
                "attack": 0.02,
                "attackCurve": "linear",
                "decay": 0.8,
                "decayCurve": "exponential",
                "release": 0.01,
                "releaseCurve": "exponential",
                "sustain": 1
            },
            "modulationIndex": 0.22
        })
    }

    get trompette() {
        return new tone.FMSynth({
            modulationIndex: 12.22,
            envelope: {
                attack: 0.01,
                decay: 0.5
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.2,
                decay: 0.05
            }
        })
    }

    get hautbois() {
        return new tone.PolySynth(tone.MonoSynth, {
            volume: -8,
            oscillator: {
                type: "square8"
            },
            envelope: {
                attack: 0.02,
                decay: 0.5,
                sustain: 0.01,
                release: 0.2,
            },
            filterEnvelope: {
                attack: 0.02,
                decay: 0.5,
                sustain: 0.01,
                release: 0.2,
                baseFrequency: 300,
                octaves: 4
            }
        })
    }

    get piano() {
        return new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "sawtooth7"
            },
            envelope: {
                attack: 0.02,
                decay: 0.4,
                sustain: 0.15,
                release: 0.01
            },
            modulation: {
                type: "sawtooth"//square //sine
            },
            modulationEnvelope: {
                attack: 1.5,
                decay: 0.0501,
                // sustain: 1,
            }

        })
    };

    get something() {
        return new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "sawtooth7"
            },
            envelope: {
                attack: 0.02,
                decay: 0.6,
                sustain: 0.1,
                release: 0.1
            },
            modulation: {
                type: "sawtooth"//square //sine
            },
            modulationEnvelope: {
                attack: 1,
                decay: 0.501
            }
        });

    }


    get goodPiano() {
        return new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "sawtooth7"
            },
            envelope: {
                attack: 0.01,
                decay: 0.6,
                sustain: 0.02,
                release: 0.03
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 1,
                decay: 0.501
            }
        } as AMSynthOptions)
    };

//look a lot like a piano
    get likeAPiano() {
        return new tone.AMSynth({
            harmonicity: 2.5,
            oscillator: {
                type: "fatsawtooth3"
            },
            envelope: {
                attack: 0.0,
                decay: 0.6,
                sustain: 0.02,
                release: 0.3
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.5,
                decay: 0.01
            }
        } as AMSynthOptions)
    };

    get som() {
        return new tone.AMSynth({
            "volume": 1,
            "detune": 1,
            "portamento": 0,
            "harmonicity": 2.5,
            "oscillator": {
                "phase": 0,
                "type": "fatsawtooth",
                "count": 3,
                "spread": 20
            },
            "envelope": {
                "attack": 0.1,
                "attackCurve": "linear",
                "decay": 0.2,
                "decayCurve": "exponential",
                "release": 0.3,
                "releaseCurve": "exponential",
                "sustain": 0.2
            },
            "modulation": {
                "partialCount": 0,
                "phase": 0,
                "type": "square"
            },
            "modulationEnvelope": {
                "attack": 0.5,
                "attackCurve": "linear",
                "decay": 0.01,
                "decayCurve": "exponential",
                "release": 0.5,
                "releaseCurve": "exponential",
                "sustain": 1
            }
        })
    }

}

export const instrumentSamples = new InstrumentSample()

export function playNote(instrument, note: Note, now: number, tempo = 1): number {
    let temp1 = duration(note.value) * tempo;
    if (note.tune == "S") {
        now += temp1
    } else {
        instrument.triggerAttackRelease(note.tune, note.value, now)
        now += temp1
    }
    return now;
}

export function play(partition: Array<any>, tempo = 1) {
    let flatpartition = flatPartition(partition)
    let now = tone.now()
    const instrument = instrumentSamples.pianoOld;
    instrument.toDestination()
    for (let i = 0; i < 1; i++) {
        flatpartition.forEach((n) => {
            now = playNote(instrument, n, now)
        })
    }
};

/**
 * convert to tone class "Part"
 * @param instrument
 * @param partition
 */
export function toTonePart(instrument, partition: Array<any>, tempo = 1) {

    let flatpartition = flatPartition(partition)
    let timeToPlay = 0;
    return new tone.Part((time, note) => {
        timeToPlay += playNote(instrument, note as Note, timeToPlay, 1.2)
    }, flatpartition.map((note) => [0, note]));
}

