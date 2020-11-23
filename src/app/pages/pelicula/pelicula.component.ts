import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movie: MovieResponse;

  constructor(private _acRouter: ActivatedRoute,
              private _movieService: PeliculasService,
              private _location: Location) { }

  ngOnInit(): void {
    const id = this._acRouter.snapshot.params.id;
    console.log(id)
    this._movieService.getPeliculaDetalle(id)
    .subscribe(data => {
        console.log(data)
        this.movie = data;
    })
  }

  regresar() {
    this._location.back();
  }

}
