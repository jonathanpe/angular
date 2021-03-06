import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit,OnDestroy{
  @Output() paginate: EventEmitter<{ start: number, end: number }> = new EventEmitter();

  perPage: number = 3; // nombre d'albums par page
  pages: number[] = []; // numéro des pages 1, 2, 3, ...
  total: number = 0; // total des albums
  currentPage: number; // page courante
  numberPages: number = 0; // nombre de page(s)

  constructor(private aS: AlbumService,private router:Router) {
    console.log(this.router.url)
    this.perPage = this.router.url == '/statistiques' ? 4 : 3
    this.total = this.aS.count();
    this.aS.sendCurrentNumberPage.subscribe(number=>{
      console.log(number)
    })
  }

  ngOnInit() {
    // initialiser la création des numéros de page
    this.init();
  }

  init(page: number = 1) {
    this.numberPages = Math.ceil(this.total / this.perPage);
    this.currentPage = page;

    for (let p = 0; p < this.numberPages; p++) this.pages.push(p + 1);
  }

  selectedPage(page: number) {
    this.currentPage = page;

    let start = (page - 1) * this.perPage;
    let end = start + this.perPage;
    this.aS.currentPage(page)
    this.paginate.emit({ start: start, end: end });
  }

  next() {
    this.currentPage = (this.currentPage == this.numberPages) ? 1 : this.currentPage + 1;
    this.selectedPage(this.currentPage);
  }

  previous() {
    this.currentPage = (this.currentPage == 1) ? this.numberPages : this.currentPage - 1;
    this.selectedPage(this.currentPage);
  }

  ngOnDestroy(){
    console.log('...destroy')
  }

}
