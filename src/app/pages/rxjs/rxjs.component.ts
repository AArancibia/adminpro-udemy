import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      //.retry(2) //intentar hacer otra vez  si hay error
      .subscribe(
      numero => console.log('Subs ', numero),
      error => console.log('Error', error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next(salida);
        /*if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {

          observer.error('Auxilio');
        }*/
      }, 500);

    }).retry(2)
      .map((resp: any) => {
        return resp.valor;
      })
      .filter((valor, index) => {
        return valor % 2 ? true : false;

      });
  }

}
