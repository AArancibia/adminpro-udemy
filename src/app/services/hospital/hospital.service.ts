import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SubirArchivoService} from "../subir-archivo/subir-archivo.service";
import {HospitalModel} from "../../models/hospital.model";
import {URL_SERVICIOS} from "../../config/config";
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {UsuarioService} from "../usuario/usuario.service";
import swal from 'sweetalert2';

@Injectable()
export class HospitalService {

  hospital: HospitalModel;

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService,
    public usuarioService: UsuarioService
  ) { }

  cargarHopitales( desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.httpClient.get(url).
      map(( res: any ) => {
        return res;
    });
  }

  obtenerHospital( id: string) {
    let token = this.usuarioService.token;
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + token;
    return this.httpClient.get( url );
  }

  borrarHospital( id: string ) {
    let token = this.usuarioService.token;
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + token;
    return this.httpClient.delete(url);
  }

  actualizarHospital( hospital: HospitalModel) {
    let token = this.usuarioService.token;
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + token;
    return this.httpClient.put(url, hospital)
      .map( ( res: any ) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return true;
      });
  }

  crearHospital( nombre: string ) {
    console.log(nombre);
    let token = this.usuarioService.token;
    let url = URL_SERVICIOS + '/hospital?token=' + token;
    return this.httpClient.post(url, { nombre })
      .map(( res: any ) => {
      return res;
    });
  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.httpClient.get( url )
      .map(( res: any) => res.hospitales);
  }

}
