import {Injectable} from '@angular/core';
import * as tone from "tone";

import { compositionUtils, chooseNoteUtils,instrumentUtils,  Note, utils, rhythmUtils, selector, harmoniqueUtils} from 'music-generator';


@Injectable({
  providedIn: 'root'
})
export class SampleMusiqueService {

  constructor() {
  }


  sampleDescendante() {

    let mainNotes = harmoniqueUtils.getNNextDescendante('B4', 24)
    let mainRhytmePart1 = utils.shuffle([["4n", "4n"], ["4n", "4n"], ["4n", "8n", "4n"]]);
    let mainRhytmePart2 = utils.shuffle([["4n", "8n", "8n"], ["8n", "8n", "4n"], ["4n", "4n"]]);
    mainRhytmePart1 [0] = ["4n"].concat(mainRhytmePart1[0])
    mainRhytmePart1 [2] = mainRhytmePart1[2].concat(["8n", "4n"])
    let mainRhytme = mainRhytmePart1.concat(mainRhytmePart2)


    let firstNoteTheme = utils.randomFromArray(mainNotes.slice(0, 3))

    console
      .log(firstNoteTheme)

    let lastNotePreviousPattern = firstNoteTheme
    let mainThemePart1 = mainRhytmePart1.map(pattern => {
      let result = compositionUtils.fillWithNotesRespecting(mainNotes, pattern, lastNotePreviousPattern, [selector.isInIntervalDegres(-6, -2), selector.isDiffOf, selector.isConsonnanteOf], chooseNoteUtils.getRandomFromBestsWhoRespect);
      compositionUtils.insertResolutionAtEndIfNeed(result, mainNotes, chooseNoteUtils.getRandomFromBestsWhoRespect);
      lastNotePreviousPattern = harmoniqueUtils.getTuneAt(harmoniqueUtils.getLevel(result[0].tune)-1)
      return result;
    })

    return mainThemePart1;
  }




  public randomMusicAngoissante() {
    const instrument = instrumentUtils.instrumentSamples.piano();

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
    const instrument = instrumentUtils.instrumentSamples.piano();
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

    let game = harmoniqueUtils.getNNextAscendente("C3", 12);
    let intro1 = chooseNoteUtils.getRandomTuneFromWhoRespect(null, game, [])
    let intro2 = chooseNoteUtils.getRandomTuneFromWhoRespect( game, [selector.isConsonnanteOf, selector.isDiffOf], {previousTune:intro1});
    let intro3 = chooseNoteUtils.getRandomTuneFromWhoRespect( game, [selector.isConsonnanteOf, selector.isDiffOf], {previousTune:intro2});

    let preparation = chooseNoteUtils.getRandomTuneFromWhoRespect([intro1, intro2], [],{previousTune:intro3} )
    let dissonante1 = chooseNoteUtils.getRandomTuneFromWhoRespect(game.slice(3, -3), [selector.isDissonanteOf, selector.isDescendanceOf],{previousTune:preparation});
    let resolution1 = chooseNoteUtils.getRandomTuneFromWhoRespect( game, [selector.isConsonnanteOf],{previousTune:dissonante1});
    let resolution1Bis = chooseNoteUtils.getRandomTuneFromWhoRespect( game, [selector.isConsonnanteOf, selector.notIn([resolution1])],{previousTune:dissonante1,});
    // let resolution1Bis = harmoniqueUtils.getRandomTuneFromWhoRespect(dissonante1, game, [selector.isConsonnanteOf, notIn([resolution1]));
    let conclusionChords = harmoniqueUtils.getPerfectChord(intro1);
    return {intro1, intro2, intro3, preparation, dissonante1, resolution1, resolution1Bis, conclusionChords};
  }


  randomMusic() {
    const instrument = instrumentUtils.instrumentSamples.piano();


    let {intro1, intro2, intro3, dissonante1, resolution1, resolution1Bis, conclusionChords} = this.extractAngoissanteNotes();
    let now = tone.now() as number
    let temp1 = 0.25 + Math.random() * 0.5;
    let temp2 = 0.25 + Math.random() * 0.5;
    let temp3 = 0.25 + Math.random() * 0.5;
    now = instrumentUtils.playNote(instrument, new Note(intro1, "8n"), now);
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
    let game = harmoniqueUtils.getNNextAscendente('C3', 24)
    let intro1 = harmoniqueUtils.randomTune();
    let intro2 = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1], game, [selector.isConsonnanteOf, selector.isDiffOf]);
    let intro3 = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1, intro2], game, [selector.isConsonnanteOf, selector.isDiffOf, selector.notIn([intro1])]);
    let intro4 = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1, intro2, intro3], game, [selector.isConsonnanteOf, selector.isDiffOf, selector.notIn([intro1])]);

    let dissonante1 = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1], game, [selector.isDissonanteOf, selector.isDescendanceOf]);
    let dissonante2 = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1, dissonante1], game, [selector.isDissonanteOf, selector.isDescendanceOf]);
    let resolution1 = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1, dissonante1, dissonante2], game, [selector.isConsonnanteOf, selector.isDiffOf, selector.notIn([intro1])]);
    let dissonante2Bis = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1, dissonante1], game, [selector.isDissonanteOf, selector.isDescendanceOf]);

    let resolution1Bis = chooseNoteUtils.getRandomTuneFromWhoRespectAll([intro1, dissonante1, dissonante2Bis], game, [selector.isConsonnanteOf, selector.isDiffOf, selector.notIn([intro1, resolution1])]);
    let conclusionChords = harmoniqueUtils.getPerfectChord(intro1);
    let final = chooseNoteUtils.getRandomTuneFromWhoRespectAll(conclusionChords, game, [selector.isConsonnanteOf, selector.isDiffOf]);


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
    let r = rhythmUtils.randomRhythmOfSize(4);

    let r2 = utils.shuffle(r)
    instrumentUtils.play(r2)

  }


  fullScale() {

    return  harmoniqueUtils.getNNextAscendente('D2',30).map(n=>new Note(n,"4n"));

  }


  randomRythmeChords() {


    let mainNotes = harmoniqueUtils.getPerfectChord(utils.randomFromArray(harmoniqueUtils.getNNextDescendante('B3', 12)))//this.extractCommonNotes();
    let mainRhytme = rhythmUtils.randomRhythmOfSize(8, [["4n"], ["8n", "8n"], ["16n", "16n", "16n", "16n"]]);

    function fillWithRandomNote(mainRhytme, mainNotes) {
      return mainRhytme.map((pattern) => {
        return pattern.map(duration => {
          return new Note(utils.randomFromArray(mainNotes), duration)
        });
      });
    }

    let mainTheme = fillWithRandomNote(mainRhytme, mainNotes);
    let intro = fillWithRandomNote(mainRhytme, mainNotes.slice(0, 2).concat(mainNotes[0]));

    let variation1 = utils.shuffle(mainTheme)
    let variation2 = utils.shuffle(mainTheme)


    let conclusion = fillWithRandomNote(mainRhytme, mainNotes.slice(0, 3));


    console.log(mainNotes)
    console.log(mainTheme)
    let form = [intro, [new Note("S", "16n")], mainTheme, variation1, [new Note("S", "16n")], mainTheme, variation2, [new Note("S", "16n")], mainTheme, conclusion]
    let partition = form.reduce((a, b) => a.concat(b)).reduce((a, b) => a.concat(b))


    let lastDissonance = partition[partition.length - 2]
    let lastConsonnance = partition[partition.length - 1]
    lastConsonnance.duration = "4n"

    lastConsonnance.value = chooseNoteUtils.getRandomTuneFromWhoRespect( mainNotes, [selector.isConsonnanteOf, selector.isDescendanceOf],lastDissonance.value)
    return partition;

  }


  regularRythmeChords() {


    let mainNotes = harmoniqueUtils.getPerfectChord(utils.randomFromArray(harmoniqueUtils.getNNextAscendente('C3', 12)))//this.extractCommonNotes();
    let mainRhytme = rhythmUtils.randomRhythmOfSize(8, [["4n"], ["4n", "4n"], ["4n", "4n", "4n"], ["4n", "4n", "4n", "4n"]]);


    let mainTheme = compositionUtils.fillWithRandomNote(mainRhytme, mainNotes);
    let intro = compositionUtils.fillWithRandomNote(mainRhytme, mainNotes.slice(0, 2).concat(mainNotes[0]));

    let variation1 = utils.shuffle(mainTheme)
    let variation2 = utils.shuffle(mainTheme)


    let conclusion = compositionUtils.fillWithRandomNote(mainRhytme, mainNotes.slice(0, 3));


    console.log(mainNotes)
    console.log(mainTheme)
    let form = [intro, mainTheme, variation1, mainTheme, variation2, mainTheme, conclusion]
    console.log(form)
    let partition = form.reduce((a, b) => a.concat(b)).reduce((a, b) => a.concat(b))


    let lastDissonance = partition[partition.length - 2]
    let lastConsonnance = partition[partition.length - 1]
    lastConsonnance.duration = "4n"

    lastConsonnance.value = chooseNoteUtils.getRandomTuneFromWhoRespect(mainNotes, [selector.isConsonnanteOf, selector.isDescendanceOf],lastDissonance.value)

    console.log(partition)
    let now = tone.now()


    return partition

  }

}
