import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';

import { MapaPage } from './mapa.page';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'
    })
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
