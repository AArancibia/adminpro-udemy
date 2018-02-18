import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarService, SharedService, SettingsService} from './service.index';
import {UsuarioService} from "./usuario/usuario.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginGuardGuard} from "./guards/login-guard.guard";

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
    LoginGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }
