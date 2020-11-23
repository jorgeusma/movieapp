import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];
  @HostListener('window:scroll', ['$event'])

  onScroll() {
    const pos =  (document.documentElement.scrollTop || document.body.scrollTop)+1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      if(this._moviesService.cargando) { return; }
      this._moviesService.getCartelera()
        .subscribe( data => {
            this.movies.push(...data);
        });
    }
  }


  constructor(private _moviesService: PeliculasService) { }

  ngOnInit(): void {
    this._moviesService.getCartelera()
      .subscribe(data => {
         this.movies = data;
         this.moviesSlideShow = data;
      });
  }

  ngOnDestroy() {
    this._moviesService.resetCarteleraPage();
  }
}
