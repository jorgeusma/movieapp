import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  movies: Movie[] = [];
  textoBuscado: string;

  constructor(
            private _activatedRoute: ActivatedRoute,
            private _moviesService: PeliculasService
            ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.textoBuscado = params.texto;
      console.log(params)
      this._moviesService.buscarPeliculas(params.texto)
        .subscribe(data => {
          this.movies = data;
        });
    });
  }

}
