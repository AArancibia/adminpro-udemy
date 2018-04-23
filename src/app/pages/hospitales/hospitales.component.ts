import { Component, OnInit } from '@angular/core';
import {HospitalModel} from "../../models/hospital.model";
import {HospitalService} from "../../services/service.index";
import swal from 'sweetalert2'
import {UsuarioService} from "../../services/usuario/usuario.service";
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospital: HospitalModel[] = [];
  desde: number = 0;
  tottalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion
      .subscribe( resp => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHopitales(this.desde)
      .subscribe(
        ( res: any ) => {
          this.hospital = res.hospitales;
          this.tottalRegistros = res.total;
        },
        (err) => {

        },
        () => {
          this.cargando = false;
        }
      );
  }

  buscarHospitales( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    //this.cargando = true;

    this.hospitalService.buscarHospital(termino)
      .subscribe(( hospitales: HospitalModel[]) => {
        this.hospital = hospitales;
        //this.cargando = false;
      });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    console.log(desde);
    if ( desde >= this.tottalRegistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  borrarHospital( hospital ) {

    swal({
      title: '¿Estás Seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital._id)
          .subscribe(
            ( borrado ) => {
              swal(
                'Exito',
                'Hospital borrado con exito',
                'success'
              );
              this.cargarHospitales();
            },
            (error) => {
              swal(
                'Fallo',
                'No se pudo borrar el Hospital',
                'error'
              );
            }
          );
      }
    });
  }

  guardarHospital( hospital: HospitalModel) {
    this.hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  mostrarModal( id ) {
    this.modalUploadService.mostrarModal( 'hospitales', id );
  }

  crearHospital() {
    swal({
      title: 'Ingrese el Nombre del Hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this.hospitalService.crearHospital( result.value )
          .subscribe(
            (res: any) => {
              this.hospital = res.hospital;
            },
            (err) => console.log(err),
            () => {
              swal({
                type: 'success',
                title: 'Hospital Creado!',
                html: 'Con Nombre: ' + result.value
              });
              this.cargarHospitales();
            }
          );
      }
    });
  }

}
