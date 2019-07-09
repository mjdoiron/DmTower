import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private sessionService: SessionService,
    private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
  }
  ionViewWillEnter() {
    this.menu.enable(false);
  }
}
