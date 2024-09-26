import { Component, OnInit } from '@angular/core';
import { RickAndMortyServiceService } from '../service/rick-and-morty-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.css']
})
export class RickAndMortyComponent implements OnInit {

  characters: any[] = [];

  constructor(private rickAndMortyService: RickAndMortyServiceService,private router: Router) { }

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }
  onCharacterClick(id: number): void {
    this.router.navigate(['/character', id]);
  }

}
