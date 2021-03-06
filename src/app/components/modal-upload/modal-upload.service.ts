import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('modal service listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
