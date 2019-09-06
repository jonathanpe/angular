import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../album';
type Order = (a: Album, b: Album) => number;
@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  allAlbums : Album[]
  albums : {album:Album,position:number}[] = []
  noteOrder: Order;
  orderDirection : string = '>';
  lastIndexs = {"start":0,"end":4}
  constructor(private aS:AlbumService) { }

  paginateAndGetPosition(start:number,end:number,sens:string){
    this.albums = []
    this.noteOrder=(sens=='>')?(a, b) => a.average + b.average: (a, b) => a.average - b.average;
    this.aS.paginate(start,end,this.noteOrder).forEach(val=>{
      console.log(val)
      let album = {album:val,position:this.allAlbums.indexOf(val)}
      this.albums.push(album);
    })
  }
  ngOnInit() {
    this.aS.calculAverages();
    this.aS.orderByNoteAsc(true);
    this.allAlbums=this.aS.getAlbums()
    this.paginateAndGetPosition(0,4,'>');
  }
  orderByAsc(value:boolean){
    this.orderDirection=value?'>':'<'
    console.log(this.orderDirection)
    this.paginateAndGetPosition(this.lastIndexs.start,this.lastIndexs.end,this.orderDirection);
  }

  paginateParent($event){
    this.lastIndexs = $event; 
    this.paginateAndGetPosition(this.lastIndexs.start,this.lastIndexs.end,'>');
  }

}
