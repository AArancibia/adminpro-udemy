import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/usuario.model";
import {SubirArchivoService} from "../../services/subir-archivo/subir-archivo.service";
import {ModalUploadService} from "./modal-upload.service";
import swal from 'sweetalert2'

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;


  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {

  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUploadService.ocultarModal();
  }

  subirImagen() {
    console.log(this.modalUploadService.tipo, this.modalUploadService.id)
    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
      .then(resp => {
        this.modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      })
      .catch( err => {
        console.log('error en la carga');
      });
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

}
