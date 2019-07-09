import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private menu: MenuController) { }

   ngOnInit() {
    this.menu.enable(false)
  }
  ionViewWillLoad(){
    this.menu.enable(false)
  }
}