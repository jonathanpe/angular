import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';

import { ShufflePipe } from './shuffle.pipe';
import { PaginateComponent } from './paginate/paginate.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    LoginComponent,
    AlbumDescriptionComponent,
    ShufflePipe,
    PaginateComponent,
    StatistiquesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // module de routing
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ShufflePipe], // le pipe ici on souhaite l'utiliser comme un service
  bootstrap: [AppComponent] // composant principal
})
export class AppModule { }
