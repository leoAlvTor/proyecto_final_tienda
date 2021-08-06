import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuclienteComponent } from './menucliente.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [MenuclienteComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuclienteComponent],
})
export class MenuClienteModule implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
