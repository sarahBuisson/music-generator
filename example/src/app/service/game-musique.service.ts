import {Injectable} from '@angular/core';
import { compositionUtils, chooseNoteUtils, Note, utils, selector, harmoniqueUtils} from 'music-generator';





@Injectable({
  providedIn: 'root'
})
export class GameMusiqueService {

  constructor() {
  }

  gameDeprimanteMusicRandom(): any {
    function choseNoteFromRandomNWhoRespect(sizeOfChoice) {
      const chooseNoteWhoRespect = (note: string, possibilites: Array<string>, filters: Array<(n1: string, n2: string) => boolean>) => {
        const values = possibilites.filter((newNote) => {
          return filters.every((f) => {
            return f.bind(this)(note, newNote)
          });
        });
        return utils.randomFromArray(values.slice(0, sizeOfChoice));
      };
      return chooseNoteWhoRespect;
    }

    let chooseNoteWhoRespect = choseNoteFromRandomNWhoRespect(3);
    return this.generateMusicDeprimante(chooseNoteWhoRespect)
  }

  menuDeprimanteMusicRandom(): any {

    let chooseNoteWhoRespect = chooseNoteUtils.getFirstTuneWhoRespect;
    return this.generateMusicDeprimante(chooseNoteWhoRespect)
  }

  gameMusicRandom(): any {

    let chooseNoteWhoRespect = chooseNoteUtils.getRandomFromBestsWhoRespect;
    return this.generateMusicAngoissante(chooseNoteWhoRespect)
  }

  menuMusicRandom(): any {

    let chooseNoteWhoRespect = chooseNoteUtils.getFirstFromBestsWhoRespect;
    return this.generateMusicAngoissante(chooseNoteWhoRespect)
  }


  generateMusicDeprimante(chooseNoteWhoRespect) {


    let mainNotes = harmoniqueUtils.getNNextDescendante('B4', 24)
    let mainRhytme = utils.shuffle([['4n', '4n'], ['4n', '4n'], ['4n', '4n.']]);

    mainRhytme[0] = ['4n'].concat(mainRhytme[0])
    mainRhytme[2] = mainRhytme[2].concat(['4n.'])


    let firstNoteTheme = utils.randomFromArray(mainNotes.slice(0, 4))
    let mainTheme = compositionUtils.fillPatternWithNoteDescendantes(firstNoteTheme, mainRhytme, mainNotes, chooseNoteWhoRespect);


    let firstNoteIntro = utils.randomFromArray(mainNotes.slice(0, 4).filter(n => firstNoteTheme != n))

    let intro = compositionUtils.fillPatternWithNoteDescendantes(firstNoteIntro, mainRhytme, mainNotes, chooseNoteWhoRespect);
    let beforeLastNoteIntro = compositionUtils.flatPartition(intro).reverse()[1].tune

    let lastNoteIntro = chooseNoteWhoRespect(firstNoteTheme, mainNotes, [selector.isConsonnanteOf, (n, n2) => {
      return selector.isConsonnanteOf(n2, beforeLastNoteIntro)
    }])
    compositionUtils.flatPartition(intro).reverse()[0].tune = lastNoteIntro;

    let variation1 = compositionUtils.fillPatternWithNoteDescendantes(mainTheme[0][0].tune, mainRhytme, mainNotes.filter(n => n != mainTheme[0].tune), chooseNoteWhoRespect);
    let variation2 = compositionUtils.fillPatternWithNoteDescendantes(mainTheme[0][0].tune, mainRhytme, mainNotes.filter(n => n != mainTheme[0].tune && n != variation1[0].tune), chooseNoteWhoRespect);


    let conclusion = compositionUtils.fillWithNotesRespecting(mainNotes.filter(n => n != mainTheme.reverse()[0].tune && n != variation1.reverse()[0].tune && n != variation2.reverse()[0].tune), mainRhytme, mainTheme[0][0].tune, chooseNoteWhoRespect);

    let form = [intro, mainTheme, variation1, mainTheme, variation2, mainTheme, conclusion]
    let partition = compositionUtils.flatPartition(form)

    return partition

  }


  generateMusicAngoissante(chooseNoteWhoRespect=chooseNoteUtils.getRandomFromBestsWhoRespect) {


    let mainNotes = harmoniqueUtils.getNNextDescendante('B4', 24)
    let mainRhytmePart1 = utils.shuffle([['4n', '4n', '8n', '8n'], ['8n', '8n', '4n', '4n',], ['4n', '4n', '4n'], ['4n', '4n', '4n']]).slice(0, 2);
    let mainRhytmePart2 = utils.shuffle([['4n', '4n', '8n', '8n'], ['8n', '8n', '4n', '4n',], ['4n', '4n', '4n'], ['8n', '8n', '8n', '8n', '4n',],]).slice(0, 2);
    ;
    //mainRhytmePart1[0] = ['4n'].concat(mainRhytmePart1[0])
    //mainRhytmePart1[2] = mainRhytmePart1[2].concat(['8n', '4n'])
    let mainRhytme = mainRhytmePart1.concat(mainRhytmePart2)


    let firstNoteTheme = utils.randomFromArray(mainNotes.slice(0, 3))

    let lastNotePreviousPattern = firstNoteTheme
    let mainThemePart1;
    try {
      let previousPattern = [null, new Note(firstNoteTheme, ""), null]
      mainThemePart1 = mainRhytmePart1.map((pattern, indexP) => {
        let firstNote = previousPattern.length > 2 ? utils.randomFromArray(previousPattern.slice(1, -1)).tune : utils.randomFromArray(harmoniqueUtils.getTunesBeetween(previousPattern[0].tune, previousPattern[1].tune))
        let maxNoteIndex = Math.round((indexP + pattern.length * 2) * mainNotes.length / (mainRhytmePart1.length + pattern.length * 2));
        let firstNoteIndex = mainNotes.findIndex((n) => n === firstNote)
        let currentNotes = mainNotes.slice(firstNoteIndex, maxNoteIndex);
        let result = compositionUtils.fillWithNotesRespecting2(currentNotes, pattern, lastNotePreviousPattern, [selector.isDescendanceOf, selector.isDiffOf], chooseNoteWhoRespect);
        compositionUtils.insertResolutionAtEndIfNeed(result, mainNotes, chooseNoteWhoRespect);
        lastNotePreviousPattern = harmoniqueUtils.getTuneAt(harmoniqueUtils.getLevel(result[0].tune) - 1)
        previousPattern = result;
        return result;
      })
    } catch (e) {
      console.error(e)
      console.error('fail create main theme')
    }

    //  let mainThemePart1 = fillWithNotesRespecting(mainNotes, mainRhytmePart1, firstNoteTheme, [isInIntervalConsonnance(-1), isInIntervalDegres(6, 3), isDiffOf], chooseNoteWhoRespect);
    let flatMainThemePart1 = compositionUtils.flatPartition(mainThemePart1);
    let noteFromPart1 = harmoniqueUtils.getSuroundingTunes(flatMainThemePart1.map(n => n.tune));
    let noteForPart2 = noteFromPart1.slice(noteFromPart1.length / 4, -noteFromPart1.length / 4)
    //noteForPart2 = mainNotes.concat(getSuroundingTunes(noteForPart2));
    if (noteForPart2.length < 2) {
      console.error('not enought note')
    }

    let mainThemePart2 = utils.shuffle(mainThemePart1).map((pattern: Array<Note>) => {
      let shufflePattern = utils.shuffle(pattern)
      let rythme = compositionUtils.flatPartition(shufflePattern).map(n => n.value);
      let newPattern = compositionUtils.fillWithRandomNote([rythme], noteForPart2)
      compositionUtils.insertDisconnanceAndResolutionAtEnd(compositionUtils.flatPartition(newPattern), noteForPart2, chooseNoteWhoRespect)
      return newPattern;

    });


    let mainTheme = mainThemePart1.concat(mainThemePart2)
    let mainThemeNotes = compositionUtils.flatPartition(mainTheme).map(n => n.tune);


    let intro = compositionUtils.fillWithNotesRespecting(harmoniqueUtils.getSuroundingTunes(mainThemePart1[0].map(n => n.tune)), mainRhytmePart2, utils.randomFromArray(mainThemeNotes), [selector.isInIntervalDegres(-3, 3)]);
    compositionUtils.insertDisconnanceAndResolutionAtEnd(compositionUtils.flatPartition(intro), mainNotes, chooseNoteWhoRespect)
    let flatIntro = compositionUtils.flatPartition(intro);


    let noteForVariation = harmoniqueUtils.getSuroundingTunes((utils.last(mainThemePart1) as Array<Note>).map(n => n.tune))
    let variation1 = utils.shuffle(mainThemePart2).map(pattern => compositionUtils.fillWithRandomNote(compositionUtils.flatPartition(pattern).map(n => n.value), noteForVariation))

    let variation2 = (utils.shuffle(variation1))


    let conclusion = compositionUtils.fillWithNotesRespecting(mainThemeNotes, mainRhytmePart2, utils.last(compositionUtils.flatPartition(variation2)).tune, [selector.isConsonnanteOf, selector.isDiffOf]);


    let form = [intro, mainThemePart1, mainThemePart2, mainThemePart1, variation1, mainThemePart1, variation2, mainThemePart1, mainThemePart2, conclusion]


    return form

  }


  moveMusic() {
    return [new Note('D3', '8n'),new Note('E3', '8n'),new Note('D3', '8n'),new Note('E3', '8n')];
  }  noMusic() {
    return [new Note('C3', '8n'),new Note('B3', '8n')];
  }

  takeMusic() {
    return  [new Note('C3', '8n'),new Note('E3', '8n'),new Note('G3', '8n')];;
  }
}


