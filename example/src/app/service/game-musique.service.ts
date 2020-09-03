import {Injectable} from '@angular/core';
import {
  fillPatternWithNoteDescendantes, fillWithNotesRespecting, fillWithNotesRespecting2, fillWithRandomNote,
  flatPartition, insertDisconnanceAndResolutionAtEnd, insertResolutionAtEndIfNeed
}from  "music-generator/dist/compositionUtils";


import {
  ContextType,
  getFirstFromBestsWhoRespect,
  getFirstTuneWhoRespect, getRandomFromBestsWhoRespect,
  getRandomTuneFromWhoRespect,
  getRandomTuneFromWhoRespectAll,
} from  "music-generator/dist/chooseNoteUtils";


import {Note} from  "music-generator/dist/Note";
import {isConsonnanteOf, isDescendanceOf, isDiffOf, isInIntervalDegres} from "music-generator/dist/harmonique/selector";
import {last, randomFromArray, shuffle} from "music-generator/dist/utils";
import {
  consonnanceLevel,
  getLevel,
  getNNextDescendante,
  getSuroundingTunes, getTuneAt,
  getTunesBeetween
} from "music-generator/dist/harmoniqueUtils";


@Injectable({
  providedIn: 'root'
})
export class GameMusiqueService {

  constructor() {
  }

  gameDeprimanteMusicRandom(): any {
    function choseNoteFromRandomNWhoRespect(sizeOfChoice) {
      let chooseNoteWhoRespect = (note: string, possibilites: Array<string>, filters: Array<(n1: string, n2: string) => boolean>) => {
        const values = possibilites.filter((newNote) => {
          return filters.every((f) => {
            return f.bind(this)(note, newNote)
          })
        });
        return randomFromArray(values.slice(0, sizeOfChoice));
      }
      return chooseNoteWhoRespect;
    }

    let chooseNoteWhoRespect = choseNoteFromRandomNWhoRespect(3);
    return this.generateMusicDeprimante(chooseNoteWhoRespect)
  }

  menuDeprimanteMusicRandom(): any {

    let chooseNoteWhoRespect = getFirstTuneWhoRespect;
    return this.generateMusicDeprimante(chooseNoteWhoRespect)
  }

  gameMusicRandom(): any {

    let chooseNoteWhoRespect = getRandomFromBestsWhoRespect;
    return this.generateMusicAngoissante(chooseNoteWhoRespect)
  }

  menuMusicRandom(): any {

    let chooseNoteWhoRespect = getFirstFromBestsWhoRespect;
    return this.generateMusicAngoissante(chooseNoteWhoRespect)
  }


  generateMusicDeprimante(chooseNoteWhoRespect) {


    let mainNotes = getNNextDescendante('B4', 24)
    let mainRhytme = shuffle([["4n", "4n"], ["4n", "4n"], ["4n", "4n."]]);

    mainRhytme[0] = ["4n"].concat(mainRhytme[0])
    mainRhytme[2] = mainRhytme[2].concat(["4n."])


    let firstNoteTheme = randomFromArray(mainNotes.slice(0, 4))
    console.log(mainNotes)
    console.log(mainNotes.slice(0, 4))
    console.log(firstNoteTheme)
    let mainTheme = fillPatternWithNoteDescendantes(firstNoteTheme, mainRhytme, mainNotes, chooseNoteWhoRespect);


    let firstNoteIntro = randomFromArray(mainNotes.slice(0, 4).filter(n => firstNoteTheme != n))

    let intro = fillPatternWithNoteDescendantes(firstNoteIntro, mainRhytme, mainNotes, chooseNoteWhoRespect);
    let beforeLastNoteIntro = flatPartition(intro).reverse()[1].tune

    let lastNoteIntro = chooseNoteWhoRespect(firstNoteTheme, mainNotes, [isConsonnanteOf, (n, n2) => {
      return isConsonnanteOf(n2, beforeLastNoteIntro)
    }])
    flatPartition(intro).reverse()[0].tune = lastNoteIntro;

    let variation1 = fillPatternWithNoteDescendantes(mainTheme[0][0].tune, mainRhytme, mainNotes.filter(n => n != mainTheme[0].tune), chooseNoteWhoRespect);
    let variation2 = fillPatternWithNoteDescendantes(mainTheme[0][0].tune, mainRhytme, mainNotes.filter(n => n != mainTheme[0].tune && n != variation1[0].tune), chooseNoteWhoRespect);


    let conclusion = fillWithNotesRespecting(mainNotes.filter(n => n != mainTheme.reverse()[0].tune && n != variation1.reverse()[0].tune && n != variation2.reverse()[0].tune), mainRhytme, mainTheme[0][0].tune, chooseNoteWhoRespect);

    let form = [intro, mainTheme, variation1, mainTheme, variation2, mainTheme, conclusion]
    let partition = flatPartition(form)

    return partition

  }


  generateMusicAngoissante(chooseNoteWhoRespect=getRandomFromBestsWhoRespect) {


    let mainNotes = getNNextDescendante('B4', 24)
    let mainRhytmePart1 = shuffle([["4n", "4n", "8n", "8n"], ["8n", "8n", "4n", "4n",], ["4n", "4n", "4n"], ["4n", "4n", "4n"]]).slice(0, 2);
    let mainRhytmePart2 = shuffle([["4n", "4n", "8n", "8n"], ["8n", "8n", "4n", "4n",], ["4n", "4n", "4n"], ["8n", "8n", "8n", "8n", "4n",],]).slice(0, 2);
    ;
    //mainRhytmePart1[0] = ["4n"].concat(mainRhytmePart1[0])
    //mainRhytmePart1[2] = mainRhytmePart1[2].concat(["8n", "4n"])
    let mainRhytme = mainRhytmePart1.concat(mainRhytmePart2)


    let firstNoteTheme = randomFromArray(mainNotes.slice(0, 3))

    console.log(firstNoteTheme)
    let lastNotePreviousPattern = firstNoteTheme
    let mainThemePart1;
    try {
      let previousPattern = [null, new Note(firstNoteTheme, ""), null]
      mainThemePart1 = mainRhytmePart1.map((pattern, indexP) => {
        let firstNote = previousPattern.length > 2 ? randomFromArray(previousPattern.slice(1, -1)).tune : randomFromArray(getTunesBeetween(previousPattern[0].tune, previousPattern[1].tune))
        let maxNoteIndex = Math.round((indexP + pattern.length * 2) * mainNotes.length / (mainRhytmePart1.length + pattern.length * 2));
        let firstNoteIndex = mainNotes.findIndex((n) => n === firstNote)
        let currentNotes = mainNotes.slice(firstNoteIndex, maxNoteIndex);
        let result = fillWithNotesRespecting2(currentNotes, pattern, lastNotePreviousPattern, [isDescendanceOf, isDiffOf], chooseNoteWhoRespect);
        insertResolutionAtEndIfNeed(result, mainNotes, chooseNoteWhoRespect);
        lastNotePreviousPattern = getTuneAt(getLevel(result[0].tune) - 1)
        previousPattern = result;
        return result;
      })
    } catch (e) {
      console.error(e)
      console.error("fail create main theme")
    }

    //  let mainThemePart1 = fillWithNotesRespecting(mainNotes, mainRhytmePart1, firstNoteTheme, [isInIntervalConsonnance(-1), isInIntervalDegres(6, 3), isDiffOf], chooseNoteWhoRespect);
    let flatMainThemePart1 = flatPartition(mainThemePart1);
    let noteFromPart1 = getSuroundingTunes(flatMainThemePart1.map(n => n.tune));
    let noteForPart2 = noteFromPart1.slice(noteFromPart1.length / 4, -noteFromPart1.length / 4)
    //noteForPart2 = mainNotes.concat(getSuroundingTunes(noteForPart2));
    if (noteForPart2.length < 2) {
      console.error("not enought note")
    }

    let mainThemePart2 = shuffle(mainThemePart1).map((pattern: Array<Note>) => {
      let shufflePattern = shuffle(pattern)
      let rythme = flatPartition(shufflePattern).map(n => n.value);
      let newPattern = fillWithRandomNote([rythme], noteForPart2)
      insertDisconnanceAndResolutionAtEnd(flatPartition(newPattern), noteForPart2, chooseNoteWhoRespect)
      return newPattern;

    });
    console.log("(mainThemePart1)")
    console.log((mainThemePart1))
    console.log("(mainThemePart2)")
    console.log((mainThemePart2))


    let mainTheme = mainThemePart1.concat(mainThemePart2)
    let mainThemeNotes = flatPartition(mainTheme).map(n => n.tune);
    console.log(mainThemeNotes)

    let intro = fillWithNotesRespecting(getSuroundingTunes(mainThemePart1[0].map(n => n.tune)), mainRhytmePart2, randomFromArray(mainThemeNotes), [isInIntervalDegres(-3, 3)]);
    insertDisconnanceAndResolutionAtEnd(flatPartition(intro), mainNotes, chooseNoteWhoRespect)
    let flatIntro = flatPartition(intro);
    console.log("intro" + flatIntro)


    let noteForVariation = getSuroundingTunes((last(mainThemePart1) as Array<Note>).map(n => n.tune))
    let variation1 = shuffle(mainThemePart2).map(pattern => fillWithRandomNote(flatPartition(pattern).map(n => n.value), noteForVariation))
    console.log("variation1" + variation1)
    let lastnoteV1 = last(flatPartition(variation1).map(n => n.tune))
    let firstnoteV1 = flatPartition(variation1)[0].tune
    let variation2 = (shuffle(variation1))
    console.log("variations")
    console.log(flatPartition(mainThemePart2))
    console.log(flatPartition(shuffle(mainThemePart2)))
    console.log(flatPartition(variation1))
    console.log(flatPartition(variation2))


    let conclusion = fillWithNotesRespecting(mainThemeNotes, mainRhytmePart2, last(flatPartition(variation2)).tune, [isConsonnanteOf, isDiffOf]);
    console.log("conclusion" + conclusion)

    let form = [intro, mainThemePart1, mainThemePart2, mainThemePart1, variation1, mainThemePart1, variation2, mainThemePart1, mainThemePart2, conclusion]
    console.log([intro, mainThemePart1, mainThemePart2, variation1, mainTheme, variation2, mainTheme, conclusion])


    return form

  }


}


