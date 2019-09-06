import { Injectable } from '@angular/core';

import { Album, List } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { ShufflePipe } from './shuffle.pipe';
import { Subject } from 'rxjs';

// type de la fonction d'ordre permet de créer un type function
type Order = (a: Album, b: Album) => number;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = ALBUMS;
  albumLists = ALBUM_LISTS;
  numberAlbums: number = 0;
  sendCurrentNumberPage = new Subject<number>();

  // factoriser l'ordre pour le service
  defaultOrder: Order = (a, b) => a.duration - b.duration;

  // On souhaite ici injecter le pipe comme un "service" une dépendance au service AlbumService
  // ce n'est pas forcement classique mais on souhaite le fiare
  constructor(private shuffleData: ShufflePipe) { }

  getAlbums(order: Order = this.defaultOrder): Album[] { return this.albums.sort(order); }

  getAlbum(id: string): Album {

    return this.albums.find(album => album.id === id);
  }

  getAlbumList(id: string): List {

    return this.albumLists.find(list => list.id === id);
  }

  initStatus(): void {
    this.albums = this.albums.map(album => { album.status = "off"; return album; })
  }

  // cette méthode est utile pour vous montrez dans le composant AlbumDetailsComponent que le service est partagé
  // Regardez dans le typescript de ce composant AlbumDetailsComponent méthode hide et constatez que cela change
  change(id: string, title: string) {
    this.albums = this.albums.map(
      album => {
        if (album.id == id) {
          album.title = title;
        }

        return album;
      }
    )
  }

  count(): number {
    return this.albums.length;
  }

  paginate(start: number, end: number, order: Order = this.defaultOrder): Album[] {

    return this.albums.sort(order).slice(start, end);
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  search(word: string): Album[] {

    return this.albums.filter(album => album.title.includes(word));
  }

  shuffle(data: any[]) {
    // là on souhaite utiliser le pipe dans notre service
    // On va donc chercher la méthode transform du pipe que l'on applique
    // à nos données
    return this.shuffleData.transform(data);
  }
}
