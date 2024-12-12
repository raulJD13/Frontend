import { Component, OnInit } from '@angular/core';
import { DeporteService } from 'src/app/services/deporte.service';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.page.html',
  styleUrls: ['./deportes.page.scss'],
})
export class DeportesPage implements OnInit {
  deportes: any[] = [];

  constructor(private deporteService: DeporteService) {}

  ngOnInit() {
    this.loadDeportes();
  }

  loadDeportes() {
    this.deporteService.getAllDeportes().subscribe(data => {
      this.deportes = data;
      
    });
  }

  deleteDeporte(id: number) {
    this.deporteService.deleteDeporte(id).subscribe(() => {
      this.loadDeportes();
    });
  }
}
