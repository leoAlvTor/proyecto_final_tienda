import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router, private afsAuth: AngularFireAuth) {}

  clientes() {
    this.router.navigate(['clientes']);
  }
  async logOut(){
    try {
      this.afsAuth.signOut();
      this.router.navigate(['login']);
    }catch (error){
      console.log('Error : -> ', error);
    }
  }

  dashboard() {
    this.router.navigate(['dashboard']).then(r => console.log('Se navego hacia dashboard...'));
  }

  facturas(){
    this.router.navigate(['factura']).then(e => console.log(e, '<-- Se navego hacia facturas'));
  }

}
