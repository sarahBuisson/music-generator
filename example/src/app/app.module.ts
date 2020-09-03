import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PartitionViewComponent } from './partition-view/partition-view.component';
import { TempViewComponent } from './partition-view/temp-view/temp-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PartitionViewComponent,
    TempViewComponent
  ],
  imports: [CommonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
