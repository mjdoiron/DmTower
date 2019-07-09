import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Events, ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';
import { ModalAddPlayerPage } from 'src/app/pages/modal-add-player/modal-add-player.page';
import { ModalEditUserPage } from 'src/app/pages/modal-edit-user/modal-edit-user.page';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

// import { AddPlayerModalPage } from 'src/app/pages/add-player-modal/add-player-modal.page';
// import { EditPlayerModalPage } from 'src/app/pages/edit-player-modal/edit-player-modal.page';

@Component({
  selector: 'party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
})
export class PartyCardComponent implements OnInit {

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private sessionService: SessionService,
    private navController: NavController,
    private router: Router,
    private events: Events,
    private userService: UserService,
    public auth: AuthenticationService
  ) { }
  public isVisible = false;
  public players$: Observable<User[]>;
  public dm$: Observable<User>;
  public session: Session;

  async ngOnInit() {
    this.events.subscribe('session', sessionData => {
      if (sessionData !== this.session) {
        this.session = sessionData
        this.userService.updateCurrentSession(sessionData.sessionID).then(async () => {
          const observablePair = await this.userService.getPlayersAndDm(sessionData);
          this.dm$ = observablePair.dm;
          this.players$ = observablePair.players;
        });
      }
    });
  }


  async addPlayer() {
    const modal = await this.modalController.create({
      component: ModalAddPlayerPage,
      cssClass: 'auto-height add-player-modal',
      componentProps: {
        'session': this.session,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
  async editPlayer(user$) {
    const modal = await this.modalController.create({
      component: ModalEditUserPage,
      cssClass: 'auto-height edit-player-modal',
      componentProps: {
        user: user$
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }


  async leaveParty() {
    this.userService.leaveCurrentSession();
  }

}
