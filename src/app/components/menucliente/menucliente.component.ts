import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menucliente',
  templateUrl: './menucliente.component.html',
  styleUrls: ['./menucliente.component.scss'],
})
export class MenuclienteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  logOut() {
    this.router.navigate(['login']);
  }
}
