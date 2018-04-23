import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../services/socket.service";
import * as  io from "socket.io-client";

@Component({
  selector: 'app-sock',
  templateUrl: './sock.component.html',
  styles: []
})
export class SockComponent implements OnInit {


  todos: any[] = [];
  private url = 'localhost:5050/senati/api/';
  private socket;

  constructor(
    public socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.getTodos()
      .subscribe(( res: any ) => this.todos = res );
    //this.socket = io.connect(this.url);
  }

}
