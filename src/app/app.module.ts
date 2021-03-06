import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//Rutas
import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register/register.component';
import {PagesModule} from "./pages/pages.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServiceModule} from "./services/service.module";
import { SockComponent } from './components/sock/sock.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
