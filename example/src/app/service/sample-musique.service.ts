import {Injectable} from '@angular/core';
import {
  getRandomFromBestsWhoRespect,
  getRandomTuneFromWhoRespect,
  getRandomTuneFromWhoRespectAll,
} from "music-generator/dist/chooseNoteUtils"

import * as tone from "tone/build/tone.js";
import {
  isConsonnanteOf,
  isDescendanceOf,
  isDiffOf,
  isDissonanteOf,
  isInIntervalDegres,
  notIn
} from "music-generator/dist/harmonique/selector";
import {Note} from "music-generator/dist/Note";
import {randomFromArray, shuffle} from "music-generator/dist/utils";
import {fillWithNotesRespecting, fillWithRandomNote, insertResolutionAtEndIfNeed} from "music-generator/dist/compositionUtils";
import {
  getLevel,
  getNNextAscendente,
  getNNextDescendante,
  getPerfectChord, getTuneAt,
  randomTune
} from "music-generator/dist/harmoniqueUtils";
import {randomRhythmOfSize} from "music-generator/dist/rhythmUtils";
import {instrumentSamples, play, playNote} from "music-generator/dist/instrumentUtils";
@Injectable({
  providedIn: 'root'
})
export class SampleMusiqueService {

  constructor() {
  }


  sampleDescendante() {

    let mainNotes = getNNextDescendante('B4', 24)
    let mainRhytmePart1 = shuffle([["4n", "4n"], ["4n", "4n"], ["4n", "8n", "4n"]]);
    let mainRhytmePart2 = shuffle([["4n", "8n", "8n"], ["8n", "8n", "4n"], ["4n", "4n"]]);
    mainRhytmePart1 [0] = ["4n"].concat(mainRhytmePart1[0])
    mainRhytmePart1 [2] = mainRhytmePart1[2].concat(["8n", "4n"])
    let mainRhytme = mainRhytmePart1.concat(mainRhytmePart2)


    let firstNoteTheme = randomFromArray(mainNotes.slice(0, 3))

    console
      .log(firstNoteTheme)

    let lastNotePreviousPattern = firstNoteTheme
    let mainThemePart1 = mainRhytmePart1.map(pattern => {
      let result = fillWithNotesRespecting(mainNotes, pattern, lastNotePreviousPattern, [isInIntervalDegres(-6, -2), isDiffOf, isConsonnanteOf], getRandomFromBestsWhoRespect);
      insertResolutionAtEndIfNeed(result, mainNotes, getRandomFromBestsWhoRespect);
      lastNotePreviousPattern = getTuneAt(getLevel(result[0].tune)-1)
      return result;
    })

    return mainThemePart1;
  }




  public randomMusicAngoissante() {
    const instrument = instrumentSamples.piano;

    let {intro1, intro2, intro3, dissonante1, resolution1, resolution1Bis, conclusionChords, preparation} = this.extractAngoissanteNotes();
    console.log({intro1, intro2, intro3, dissonante1, resolution1, resolution1Bis, conclusionChords, preparation})
    let now = tone.now()
    let temp1 = 0.8
    let temp2 = 0.8
    let temp3 = 0.8
    instrument.triggerAttackRelease(intro1, "8n", now += temp1)
    instrument.triggerAttackRelease(intro2, "8n", now += temp2)
    instrument.triggerAttackRelease(intro3, "8n", now += temp3);


    for (let i = 0; i < 2; i++) {

      instrument.triggerAttackRelease(preparation, "8n", now += temp1)
      instrument.triggerAttackRelease(dissonante1, "8n", now += temp2)
      instrument.triggerAttackRelease(resolution1, "8n", now += temp3)

      instrument.triggerAttackRelease(intro1, "8n", now += temp1)
      instrument.triggerAttackRelease(dissonante1, "8n", now += temp2)
      instrument.triggerAttackRelease(resolution1Bis, "8n", now += temp3)
    }
    console.log(conclusionChords)
    instrument.triggerAttackRelease(intro1, "8n", now += temp1)
    instrument.triggerAttackRelease(conclusionChords[2] + 3, "8n", now += temp2)
    instrument.triggerAttackRelease(conclusionChords[1] + 3, "8n", now += temp3)

  }


  public randomMusicAngoissante2() {
    const instrument = instrumentSamples.piano;
    let {intro1, intro2, intro3, dissonante1, resolution1, resolution1Bis, conclusionChords} = this.extractAngoissanteNotes();

    console.log(intro1 + " " + intro2 + " " + intro3)
    console.log(intro1 + " " + dissonante1 + " " + resolution1)
    console.log(intro1 + " " + dissonante1 + " " + resolution1Bis)
    console.log(conclusionChords)
    let now = tone.now()
    let temp1 = 1
    let temp2 = 1
    let temp3 = 1
    let pulsation = "4n";
    instrument.triggerAttackRelease(intro1, pulsation, now += temp1)
    instrument.triggerAttackRelease(intro2, pulsation, now += temp2)
    instrument.triggerAttackRelease(intro3, pulsation, now += temp3);


    for (let i = 0; i < 2; i++) {

      instrument.triggerAttackRelease(intro1, pulsation, now += temp1)
      instrument.triggerAttackRelease(dissonante1, pulsation, now += temp2)
      instrument.triggerAttackRelease(resolution1, pulsation, now += temp3)

      instrument.triggerAttackRelease(intro1, pulsation, now += temp1)
      instrument.triggerAttackRelease(dissonante1, pulsation, now += temp2)
      instrument.triggerAttackRelease(resolution1Bis, pulsation, now += temp3)
    }
    console.log(conclusionChords)
    instrument.triggerAttackRelease(intro1, pulsation, now += temp1)
    instrument.triggerAttackRelease(conclusionChords[2] + 3, pulsation, now += temp2)
    instrument.triggerAttackRelease(conclusionChords[1] + 3, pulsation, now += temp3)

  }

  extractAngoissanteNotes() {

    let game = getNNextAscendente("C3", 12);
    let intro1 = getRandomTuneFromWhoRespect(null, game, [])
    let intro2 = getRandomTuneFromWhoRespect( game, [isConsonnanteOf, isDiffOf], {previousTune:intro1});
    let intro3 = getRandomTuneFromWhoRespect( game, [isConsonnanteOf, isDiffOf], {previousTune:intro2});

    let preparation = getRandomTuneFromWhoRespect([intro1, intro2], [],{previousTune:intro3} )
    let dissonante1 = getRandomTuneFromWhoRespect(game.slice(3, -3), [isDissonanteOf, isDescendanceOf],{previousTune:preparation});
    let resolution1 = getRandomTuneFromWhoRespect( game, [isConsonnanteOf],{previousTune:dissonante1});
    let resolution1Bis = getRandomTuneFromWhoRespect( game, [isConsonnanteOf, notIn([resolution1])],{previousTune:dissonante1,});
    // let resolution1Bis = getRandomTuneFromWhoRespect(dissonante1, game, [isConsonnanteOf, notIn([resolution1]));
    let conclusionChords = getPerfectChord(intro1);
    return {intro1, intro2, intro3, preparation, dissonante1, resolution1, resolution1Bis, conclusionChords};
  }


  randomMusic() {
    const instrument = instrumentSamples.piano;


    let {intro1, intro2, intro3, dissonante1, resolution1, resolution1Bis, conclusionChords} = this.extractAngoissanteNotes();
    let now = tone.now() as number
    let temp1 = 0.25 + Math.random() * 0.5;
    let temp2 = 0.25 + Math.random() * 0.5;
    let temp3 = 0.25 + Math.random() * 0.5;
    now = playNote(instrument, new Note(intro1, "8n"), now);
    instrument.triggerAttackRelease(intro2, "8n", now += temp2)
    instrument.triggerAttackRelease(intro3, "8n", now += temp3);


    for (let i = 0; i < 2; i++) {

      instrument.triggerAttackRelease(intro1, "8n", now += temp1)
      instrument.triggerAttackRelease(dissonante1, "8n", now += temp2)
      instrument.triggerAttackRelease(resolution1, "8n", now += temp3)

      instrument.triggerAttackRelease(intro1, "8n", now += temp1)
      instrument.triggerAttackRelease(dissonante1, "8n", now += temp2)
      instrument.triggerAttackRelease(resolution1Bis, "8n", now += temp3)
    }
    console.log(conclusionChords)
    instrument.triggerAttackRelease(intro1, "8n", now += temp1)
    instrument.triggerAttackRelease(conclusionChords[2] + 3, "8n", now += temp2)
    instrument.triggerAttackRelease(conclusionChords[1] + 3, "8n", now += temp3)

  }


  randomMusic4temps() {
    const instrument = new tone.Synth().toDestination();
    let game = getNNextAscendente('C3', 24)
    let intro1 = randomTune();
    let intro2 = getRandomTuneFromWhoRespectAll([intro1], game, [isConsonnanteOf, isDiffOf]);
    let intro3 = getRandomTuneFromWhoRespectAll([intro1, intro2], game, [isConsonnanteOf, isDiffOf, notIn([intro1])]);
    let intro4 = getRandomTuneFromWhoRespectAll([intro1, intro2, intro3], game, [isConsonnanteOf, isDiffOf, notIn([intro1])]);

    let dissonante1 = getRandomTuneFromWhoRespectAll([intro1], game, [isDissonanteOf, isDescendanceOf]);
    let dissonante2 = getRandomTuneFromWhoRespectAll([intro1, dissonante1], game, [isDissonanteOf, isDescendanceOf]);
    let resolution1 = getRandomTuneFromWhoRespectAll([intro1, dissonante1, dissonante2], game, [isConsonnanteOf, isDiffOf, notIn([intro1])]);
    let dissonante2Bis = getRandomTuneFromWhoRespectAll([intro1, dissonante1], game, [isDissonanteOf, isDescendanceOf]);

    let resolution1Bis = getRandomTuneFromWhoRespectAll([intro1, dissonante1, dissonante2Bis], game, [isConsonnanteOf, isDiffOf, notIn([intro1, resolution1])]);
    let conclusionChords = getPerfectChord(intro1);
    let final = getRandomTuneFromWhoRespectAll(conclusionChords, game, [isConsonnanteOf, isDiffOf]);


    console.log(intro1 + " " + intro2 + " " + intro3 + " " + intro4)
    console.log(intro1 + " " + dissonante1 + " " + resolution1)
    console.log(intro1 + " " + dissonante1 + " " + resolution1Bis)
    console.log(conclusionChords)
    let now = tone.now()
    instrument.triggerAttackRelease(intro1, "8n", now += 0.75);
    instrument.triggerAttackRelease(intro2, "8n", now += 0.75);
    instrument.triggerAttackRelease(intro3, "8n", now += 0.75);
    instrument.triggerAttackRelease(intro4, "8n", now += 0.75);


    for (let i = 0; i < 2; i++) {

      instrument.triggerAttackRelease(intro1, "8n", now += 0.75);
      instrument.triggerAttackRelease(dissonante1, "8n", now += 0.75);
      instrument.triggerAttackRelease(dissonante2, "8n", now += 0.75);
      instrument.triggerAttackRelease(resolution1, "8n", now += 0.75);

      instrument.triggerAttackRelease(intro1, "8n", now += 0.75);
      instrument.triggerAttackRelease(dissonante1, "8n", now += 0.75);
      instrument.triggerAttackRelease(dissonante2Bis, "8n", now += 0.75);
      instrument.triggerAttackRelease(resolution1Bis, "8n", now += 0.75);
    }
    console.log(conclusionChords);
    instrument.triggerAttackRelease(intro1, "8n", now += 0.75);
    instrument.triggerAttackRelease(conclusionChords[2] + 3, "8n", now += 0.75);
    instrument.triggerAttackRelease(conclusionChords[1] + 3, "8n", now += 0.75);
    instrument.triggerAttackRelease(final, "8n", now += 0.75);

  }

  randomRythme() {
    let r = randomRhythmOfSize(4);

    let r2 = shuffle(r)
    play(r2)

  }


  fullScale() {

    const instrument = instrumentSamples.piano
    let now = tone.now()
    return  getNNextAscendente('D2',30).map(n=>new Note(n,"4n"));

  }


  randomRythmeChords() {


    let mainNotes = getPerfectChord(randomFromArray(getNNextDescendante('B3', 12)))//this.extractCommonNotes();
    let mainRhytme = randomRhythmOfSize(8, [["4n"], ["8n", "8n"], ["16n", "16n", "16n", "16n"]]);

    function fillWithRandomNote(mainRhytme, mainNotes) {
      return mainRhytme.map((pattern) => {
        return pattern.map(duration => {
          return new Note(randomFromArray(mainNotes), duration)
        });
      });
    }

    let mainTheme = fillWithRandomNote(mainRhytme, mainNotes);
    let intro = fillWithRandomNote(mainRhytme, mainNotes.slice(0, 2).concat(mainNotes[0]));

    let variation1 = shuffle(mainTheme)
    let variation2 = shuffle(mainTheme)


    let conclusion = fillWithRandomNote(mainRhytme, mainNotes.slice(0, 3));


    console.log(mainNotes)
    console.log(mainTheme)
    let form = [intro, [new Note("S", "16n")], mainTheme, variation1, [new Note("S", "16n")], mainTheme, variation2, [new Note("S", "16n")], mainTheme, conclusion]
    let partition = form.reduce((a, b) => a.concat(b)).reduce((a, b) => a.concat(b))


    let lastDissonance = partition[partition.length - 2]
    let lastConsonnance = partition[partition.length - 1]
    lastConsonnance.duration = "4n"

    lastConsonnance.value = getRandomTuneFromWhoRespect( mainNotes, [isConsonnanteOf, isDescendanceOf],lastDissonance.value)
    return partition;

  }


  regularRythmeChords() {


    let mainNotes = getPerfectChord(randomFromArray(getNNextAscendente('C3', 12)))//this.extractCommonNotes();
    let mainRhytme = randomRhythmOfSize(8, [["4n"], ["4n", "4n"], ["4n", "4n", "4n"], ["4n", "4n", "4n", "4n"]]);


    let mainTheme = fillWithRandomNote(mainRhytme, mainNotes);
    let intro = fillWithRandomNote(mainRhytme, mainNotes.slice(0, 2).concat(mainNotes[0]));

    let variation1 = shuffle(mainTheme)
    let variation2 = shuffle(mainTheme)


    let conclusion = fillWithRandomNote(mainRhytme, mainNotes.slice(0, 3));


    console.log(mainNotes)
    console.log(mainTheme)
    let form = [intro, mainTheme, variation1, mainTheme, variation2, mainTheme, conclusion]
    console.log(form)
    let partition = form.reduce((a, b) => a.concat(b)).reduce((a, b) => a.concat(b))


    let lastDissonance = partition[partition.length - 2]
    let lastConsonnance = partition[partition.length - 1]
    lastConsonnance.duration = "4n"

    lastConsonnance.value = getRandomTuneFromWhoRespect(mainNotes, [isConsonnanteOf, isDescendanceOf],lastDissonance.value)

    console.log(partition)
    let now = tone.now()


    return partition

  }

}
