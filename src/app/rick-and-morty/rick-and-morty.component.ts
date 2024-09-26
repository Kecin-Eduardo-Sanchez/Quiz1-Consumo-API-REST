import { Component, OnInit } from '@angular/core';
import { RickAndMortyServiceService } from '../service/rick-and-morty-service.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.css']
})
export class RickAndMortyComponent implements OnInit {

  characters: any[] = [];
  filteredCharacters: any[] = [];
  searchTerm: string = '';
  selectedCharacter: any = null;
  selectedEpisodes: any[] = [];

  constructor(
    private rickAndMortyService: RickAndMortyServiceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
      this.filteredCharacters = this.characters; // Inicialmente, todos los personajes están filtrados
    });
  }

  get groupedCharacters() {
    const groups = [];
    for (let i = 0; i < this.filteredCharacters.length; i += 3) {
      groups.push(this.filteredCharacters.slice(i, i + 3));
    }
    return groups;
  }

  filterCharacters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCharacters = this.characters.filter(character => 
      character.name.toLowerCase().includes(term)
    );
  }

  onCharacterClick(id: number): void {
    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((character: any) => {
      this.selectedCharacter = character;
      this.selectedEpisodes = character.episode;
      this.fetchEpisodes(this.selectedEpisodes);
    });
  }

  fetchEpisodes(episodeUrls: string[]) {
    const validUrls = episodeUrls.filter(url => url);

    const episodeRequests = validUrls.map(url => this.http.get(url));

    if (episodeRequests.length > 0) {
      forkJoin(episodeRequests).subscribe({
        next: (episodes: any) => {
          this.selectedEpisodes = episodes.map((episode: any) => ({
            name: episode.name,
            season: episode.episode.split('E')[0].replace('S', ''),
            number: episode.episode.split('E')[1]
          }));
        },
        error: (err) => {
          console.error('Error al obtener episodios:', err);
        }
      });
    } else {
      this.selectedEpisodes = [];
    }
  }

  goBack(): void {
    this.selectedCharacter = null;
    this.selectedEpisodes = [];
  }
}
