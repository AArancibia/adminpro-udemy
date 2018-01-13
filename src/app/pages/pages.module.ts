import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {PagesRoutes} from "./pages.routes";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [
    SharedModule,
    PagesRoutes
  ]
})

export class PagesModule {}