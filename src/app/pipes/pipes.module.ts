import { NgModule } from '@angular/core';
import {ImagenPipe} from "./imagen.pipe";
import {FiltroNombrePipe} from "./filtro-nombre.pipe";

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    FiltroNombrePipe
  ],
  exports: [
    ImagenPipe,
    FiltroNombrePipe
  ]
})
export class PipesModule { }
