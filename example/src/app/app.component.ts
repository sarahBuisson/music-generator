import {Component} from '@angular/core';


// @ts-ignore
import {InstrumentService} from "./service/instrument.service";
import {GameMusiqueService} from "./service/game-musique.service";
import {SampleMusiqueService} from "./service/sample-musique.service";
import {play} from "music-generator/dist/instrumentUtils";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soundTry';
  currentPartition: any;

  constructor(
              public gameMusiqueService:GameMusiqueService,
              public sampleMusiqueService:SampleMusiqueService) {
  }


  playc() {
    play(this.currentPartition)

  }
}
