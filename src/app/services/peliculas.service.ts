import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response'
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private _http: HttpClient) { }

  get params() {
   return {
      api_key: '6f9effe058f750a1906eecb6210a7b9f',
      languag: 'es-ES',
      page: this.carteleraPage.toString()
   };
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{
    if(this.cargando){
      return of([]);
    }

    this.cargando = true;

    return this._http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas( texto: string ): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto};

    return this._http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );
  }

  getPeliculaDetalle( id: string ) {
    return this._http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    });
  }
}
