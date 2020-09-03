import * as tone from "tone/build/tone.js";
import { duration } from "./rhythmUtils";
import { flatPartition } from "./compositionUtils";
export const instrumentSamples = {
    flute: new tone.PolySynth(tone.MonoSynth, {
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
    }).toDestination(),
    pianoOld: new tone.FMSynth({
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
    }).toDestination(),
    trompette: new tone.FMSynth({
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
    }).toDestination(),
    hautbois: new tone.PolySynth(tone.MonoSynth, {
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
    }).toDestination(),
    piano: new tone.AMSynth({
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
            type: "sawtooth" //square //sine
        },
        modulationEnvelope: {
            attack: 1.5,
            decay: 0.0501,
            sustain: 1,
        }
    }).toDestination(),
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
            type: "sawtooth" //square //sine
        },
        modulationEnvelope: {
            attack: 1,
            decay: 0.501
        }
    }).toDestination(),
    goodPiano: new tone.AMSynth({
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
    }).toDestination(),
    //look a lot like a piano
    likeAPiano: new tone.AMSynth({
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
    }).toDestination(),
    som: new tone.AMSynth({
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
};
export function playNote(instrument, note, now, tempo = 1) {
    let temp1 = duration(note.value) * tempo;
    if (note.tune == "S") {
        now += temp1;
    }
    else {
        instrument.triggerAttackRelease(note.tune, note.value, now);
        now += temp1;
    }
    return now;
}
export function play(partition) {
    let flatpartition = flatPartition(partition);
    console.log("play");
    console.log(flatpartition);
    let now = tone.now();
    const instrument = this.pianoOld;
    for (let i = 0; i < 1; i++) {
        flatpartition.forEach((n) => {
            now = this.playNote(instrument, n, now, 1.2);
        });
    }
}
