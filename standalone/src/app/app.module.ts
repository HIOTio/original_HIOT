import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MdSliderModule} from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import {HttpModule } from '@angular/http';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      FormsModule,
      FlexLayoutModule,
      BrowserAnimationsModule,MdButtonModule, MdCheckboxModule,MdSliderModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
