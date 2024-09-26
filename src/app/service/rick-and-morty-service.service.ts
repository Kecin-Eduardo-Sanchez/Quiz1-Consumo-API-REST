import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServiceService {

  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.apiUrl}/character`).pipe(
      catchError(error => {
        console.error('Error fetching characters', error);
        return throwError(error);
      })
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching character with id ${id}`, error);
        return throwError(error);
      })
    );
  }

  getCharacterEpisodes(id: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.apiUrl}/character/${id}/episode`).pipe(
      catchError(error => {
        console.error(`Error fetching episodes for character with id ${id}`, error);
        return throwError(error);
      })
    );
  }
}
