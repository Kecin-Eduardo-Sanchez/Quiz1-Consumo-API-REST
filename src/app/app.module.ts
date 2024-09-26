import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RickAndMortyComponent } from './rick-and-morty/rick-and-morty.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterEpisodesComponent } from './character-episodes/character-episodes.component';
@NgModule({
  declarations: [
    AppComponent,
    RickAndMortyComponent,
    CharacterEpisodesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
