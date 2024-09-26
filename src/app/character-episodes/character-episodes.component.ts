import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyServiceService } from '../service/rick-and-morty-service.service';

@Component({
  selector: 'app-character-episodes',
  templateUrl: './character-episodes.component.html',
  styleUrls: ['./character-episodes.component.css']
})
export class CharacterEpisodesComponent implements OnInit {
  characterId: number | undefined;
  character: any; // Agregar esta propiedad
  episodes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyServiceService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.characterId = +idParam;  // Convertir a número

      // Obtener la información del personaje y los episodios
      this.rickAndMortyService.getCharacterById(this.characterId).subscribe((characterData: any) => {
        this.character = characterData;  // Guardar información del personaje
      });

      this.rickAndMortyService.getCharacterEpisodes(this.characterId).subscribe((data: any) => {
        this.episodes = data.episode;
      });
    } else {
      console.error('ID del personaje no encontrado en la ruta.');
      // Manejar el caso en que el parámetro ID no esté presente.
    }
  }
}
