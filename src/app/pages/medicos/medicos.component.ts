import { Component, OnInit } from '@angular/core';
import {MedicoModel} from "../../models/medico.model";
import {MedicoService} from "../../services/service.index";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: MedicoModel[] = [];

  constructor(
    public medicosService: MedicoService

  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicosService.cargarMedicos()
      .subscribe(
        ( medicos ) => {
          console.log( medicos );
          this.medicos = medicos ;
        }
      );
  }

  buscarMedicos( termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.medicosService.buscarMedicos( termino )
      .subscribe(
        medicos => this.medicos = medicos
      );
  }

  borrarMedico( medico: MedicoModel ) {
    this.medicosService.borrarMedico( medico._id )
      .subscribe( () => {
        this.cargarMedicos();
      });
  }
}
