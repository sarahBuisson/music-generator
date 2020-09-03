import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {flatPartition} from "music-generator/dist/compositionUtils";
import {getLevel, getSuroundingTunes} from "music-generator/dist/harmoniqueUtils";

@Component({
  selector: 'app-partition-view',
  templateUrl: './partition-view.component.html',
  styleUrls: ['./partition-view.component.css']
})
export class PartitionViewComponent implements OnInit, OnChanges {
  @Input()
  partitionForms: Array<any>;
  @Input()
  initscale:any
  scale: any;
  borderColor: string

  constructor() {
  }

  ngOnInit(): void {
    this.borderColor = '#' + Math.round(Math.random() * 9) + Math.round(Math.random() * 9) + Math.round(Math.random() * 9)
  }

  ngOnChanges(): void {
    if(this.initscale)
      this.scale=this.initscale
    else
    if (this.partitionForms) {
      console.log(this.partitionForms)
      let tunes = flatPartition(this.partitionForms).map((n) => n.tune)
      this.scale = getSuroundingTunes(tunes).sort((a,b)=>getLevel(b)-getLevel(a));
    }
  }


  isPattern(form: any) {
    return Array.isArray(form) && !Array.isArray(form[0])

  }

  isNote(form: any) {
    return !Array.isArray(form)

  }
}
