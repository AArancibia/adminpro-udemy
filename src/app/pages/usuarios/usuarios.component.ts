import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/usuario.model";
import {UsuarioService} from "../../services/service.index";
import swal from 'sweetalert2'
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  tottalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe(
        ( resp: any ) => {
          console.log(resp);
          this.tottalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        }
      );
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
    this.cargarUsuarios();
  }

  buscarUsuarios( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios()
      return;
    }

    //this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      //this.cargando = false;
      });
  }

  borrarUsuario( usuario ) {
     if ( usuario._id === this._usuarioService.usuario._id ) {
       swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
       return;
     }

    if ( this._usuarioService.usuario.rol === 'USER_ROLES') {
       swal('No se puede borrar usuario', 'No tiene permisos de Administrador', 'error');
       return;
     }

     if ( usuario.role === 'ADMIN_ROLE' ) {
       swal('No se puede borrar usuario', 'No puede borrar a otro usuario Administrador', 'error');
       return;
     }

    swal({
      title: '¿Estás Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(
            ( borrado ) => this.cambiarDesde(0),
            (error) => {
              swal(
                'Fallo',
                'No se pudo borrar el usuario',
                'error'
              );
            }
          );
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
      .subscribe();
  }

  mostrarModal( id: string ) {
    debugger;
    this.modalUploadService.mostrarModal( 'usuarios', id);
  }

}
