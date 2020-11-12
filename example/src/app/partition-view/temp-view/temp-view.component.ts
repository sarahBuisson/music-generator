import {Component, OnInit, Input} from '@angular/core';
import {Note, rhythmUtils } from "music-generator";

@Component({
  selector: 'app-temp-view',
  templateUrl: './temp-view.component.html',
  styleUrls: ['./temp-view.component.css']
})
export class TempViewComponent implements OnInit {


  @Input()
  temp: Note
  @Input()
  scale: Array<string> = [];


  style() {

    return {
      minWidth: "" + (rhythmUtils.duration(this.temp.value) * 50) + " px",
      width: "" + (rhythmUtils.duration(this.temp.value) * 50) + " px",

      display: "inline-block"
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  noteStyle(note: any) {
    if (note == this.temp.tune) {
      return {}
    } else {
      return {color: 'lightgrey'}
    }

  }
}
