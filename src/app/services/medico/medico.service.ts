import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "../../config/config";
import {UsuarioService} from "../usuario/usuario.service";
import swal from 'sweetalert2'
import {MedicoModel} from "../../models/medico.model";

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public httpClient: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.httpClient.get(url)
      .map( ( resp: any ) => {
        this.totalMedicos = resp.total;
        return resp.medico;
      });
  }

  cargarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.httpClient.get( url )
      .map( ( resp: any ) => resp.medico );
  }

  buscarMedicos( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.httpClient.get( url )
      .map(( res: any) => res.medicos);
  }

  borrarMedico( id: string ) {
    let token = this.usuarioService.token;
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + token;
    return this.httpClient.delete( url )
      .map( ( resp ) => {
        swal('Médico Borrado', 'Medico borrado correctamente', 'success');
        return resp;
      });
  }

  guardarMedico( medico: MedicoModel ) {
    let token = this.usuarioService.token;
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizando
      url += '/' + medico._id + '?token=' + token;
      return this.httpClient.put( url, medico )
        .map( ( resp: any ) => {
          swal('Medico Actualizado', medico.nombre , 'success');
          return resp.medico;
        });
    } else {
      // Creando
      url += '?token=' + token;
      return this.httpClient.post( url, medico )
        .map( ( res: any ) => {
          swal('Medico Creado', medico.nombre , 'success')
          return res.medico;
        });
    }


  }

}
