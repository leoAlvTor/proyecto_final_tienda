import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { FileSizePipe } from './file-size.pipe';
import { AgmCoreModule } from '@agm/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AgmDirectionModule } from 'agm-direction';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {HttpClientModule} from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [AppComponent,FileSizePipe],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFirestoreModule,
            AngularFireAuthModule,
            HttpClientModule,
            AgmCoreModule.forRoot({
              apiKey: ''}),
              AgmDirectionModule,
            ],
  providers: [BarcodeScanner,CallNumber,EmailComposer,  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
