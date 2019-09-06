import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { ShufflePipe } from '../shuffle.pipe';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '60px',
        opacity: 1,
        backgroundColor: 'yellow',
        padding: "1px"
      })),
      state('closed', style({
        height: '40px',
        opacity: 0.5,
        backgroundColor: 'green',
        padding: "1px"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AlbumDetailsComponent implements OnInit, OnChanges {

  @Input() album: Album;
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  hideAlbum: boolean = true; // par défaut on le cache
  songs: string[];
  isOpen = true;

  // 1/ execute en premier à l'instanciation du component et une fois
  constructor(
    private albumS: AlbumService
    
    ) {
    // console.log('En premier avant montage dans le dom');
  }

  // 2/ au montage du template dans le DOM et une fois
  ngOnInit() {
    // console.log('après montage dans le DOM')
  }

  // 2/ et lorsqu'on passe une valeur dans le selecteur @Input
  ngOnChanges() {
    // console.log('après montage dans le DOM et quand on passe une valeur parent/enfant @Input');
    // console.log(this.album); // Au montage cette valeur est null

    // le fait d'envoyer une nouvelle copie à chaque fois permet de réafficher l'album
    // nottamment celui sur lequel on vient de cliqué
    if (this.album) {
      this.hideAlbum = false; // on rend visible l'album une fois que l'on a passé un album depuis le parent

      const list: List = this.albumS.getAlbumList(this.album.id);
      this.songs = list ? list.list : [];
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
  }

  // le service AlbumService une seule instance pour l'application
  // mettre à jour les données ici les mettra ailleurs également
  // je vous ai mis dans la fonction hide une méthode change pour montrer que l'on change l'objet la valeur de l'objet albums
  // de manière globale
  hide() {
    this.hideAlbum = true;
    this.albumS.initStatus();
    // ceci est un test pour vous montrer que le service est partagé
    this.albumS.change("1", "Hello Je change ta valeur" + Math.random())
  }

  shuffle() {
    if (this.songs) {
      this.songs = this.albumS.shuffle( this.songs );
      this.toggle();
    }
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

}
