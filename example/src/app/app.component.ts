import {Component} from '@angular/core';


import {GameMusiqueService} from './service/game-musique.service';
import {SampleMusiqueService} from './service/sample-musique.service';
import {instrumentUtils} from 'music-generator';
import * as tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soundTry';
  currentPartition: any;

  constructor(public gameMusiqueService: GameMusiqueService,
              public sampleMusiqueService: SampleMusiqueService) {
  }


  playc() {
    instrumentUtils.play(this.currentPartition);

  }
  playBoucle() {
    console.log('boucle')
    const synth = new tone.Synth().toDestination();
// use an array of objects as long as the object has a 'time' attribute
    const part = new tone.Part(((time, value) => {
      // the value is an object which contains both the note and the velocity
      synth.triggerAttackRelease(value.note, '8n', time, value.velocity);
    }), [{ time: 0, note: 'C3', velocity: 0.9 },
      { time: '0:2', note: 'C4', velocity: 0.5 }
    ]);
    part.loop = true;
    part.start(0);


    console.log('boucle');
    tone.Transport.start();

  }
}
