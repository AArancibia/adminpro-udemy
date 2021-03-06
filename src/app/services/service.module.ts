import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarService, SharedService, SettingsService} from './service.index';
import {UsuarioService} from "./usuario/usuario.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginGuardGuard} from "./guards/login-guard.guard";
import {SubirArchivoService} from "./subir-archivo/subir-archivo.service";
import {ModalUploadService} from "../components/modal-upload/modal-upload.service";
import {HospitalService} from "./hospital/hospital.service";
import {SocketService} from "./socket.service";
import {MedicoService} from "./medico/medico.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    SharedService,
    SettingsService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    SocketService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
