import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HospitalModel} from "../../models/hospital.model";
import {HospitalService} from "../../services/service.index";
import {MedicoModel} from "../../models/medico.model";
import {MedicoService} from "../../services/medico/medico.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: HospitalModel[] = [];
  medico: MedicoModel = new MedicoModel('', '' , '' , '', '');
  hospital: HospitalModel = new HospitalModel('');

  constructor(
    public hospitalService: HospitalService,
    public medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params
      .subscribe( params => {
        let id = params['id'];
        if ( id !== 'nuevo' ) {
          this.cargarMedico( id );
        }
      });
  }

  ngOnInit() {
    this.hospitalService.cargarHopitales()
      .subscribe( res => this.hospitales = res.hospitales );
    this.modalUploadService.notificacion
      .subscribe( resp => {
        this.medico.img = resp.medico.img;
      });
  }

  gurdarMedico( f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this.medicoService.guardarMedico( this.medico )
      .subscribe( medico => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id ]);
      });
  }

  cambioHospital( id: string ) {
    this.hospitalService.obtenerHospital( id )
      .subscribe( ( res: any ) => this.hospital = res.hospital );
  }

  cargarMedico( id: string ) {
    this.medicoService.cargarMedico( id )
      .subscribe( medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      } );
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }
}
