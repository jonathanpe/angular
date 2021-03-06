import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const albumsRoutes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent,
    data: {state: 'home' }
  },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {state: 'login' }
  },
  {
    path: 'statistiques',
    component: StatistiquesComponent,
    data: {state: 'statistiques' }
  },
  {
    path: 'album/:id',
    component: AlbumDescriptionComponent,
    data: {state: 'description' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(albumsRoutes)], // routes principales correspondent aux routes définies pour AppModule
  exports: [RouterModule] // il faut exporter votre module de routing pour qu'il soit accessible dans AppModule
})
export class AppRoutingModule { }
