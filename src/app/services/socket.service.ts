import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SocketService {
  private apiUrl = 'http://localhost:5050/senati/api/';

  constructor(
    public httpCliente: HttpClient
  ) { }

  getTodos() {
    return this.httpCliente.get(this.apiUrl)
      .map(( res ) => {
        console.log(res);
        return res;
      });
  }
}
