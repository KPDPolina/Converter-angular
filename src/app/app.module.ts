import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }   from './app.component';
import { ApiService }   from './api.service';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    declarations: [ AppComponent ],
    providers:    [ ApiService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
