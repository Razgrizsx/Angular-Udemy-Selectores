import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Borders, Pais } from '../interfaces/paises.interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  constructor(private http : HttpClient) { }

  private baseUrl : string = "https://restcountries.com/v3.1/"
  private _regiones : string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get regiones(){
    return [...this._regiones]
  }

  paises(region : string){
    return this.http.get<Pais[]>(`${this.baseUrl}/region/${region}?fields=cca3,name`)
  }

  bordes(codigo: string) : Observable<Borders | null>{
    if(!codigo){
      return of(null)
    }
    return this.http.get<Borders>(`${this.baseUrl}alpha/${codigo}?fields=borders`)
  }
  
}
