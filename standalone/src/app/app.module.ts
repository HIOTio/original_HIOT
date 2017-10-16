import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatSliderModule} from '@angular/material';
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
      BrowserAnimationsModule,MatButtonModule, MatCheckboxModule,MatSliderModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
