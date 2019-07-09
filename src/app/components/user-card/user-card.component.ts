import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { ModalAvatarPickerPage } from 'src/app/pages/modal-avatar-picker/modal-avatar-picker.page';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HelperService } from 'src/app/services/helper/helper.service';

// import { Player } from 'src/app/models/player.model';
// import { HelperService } from 'src/app/services/helper.service';
// import { PlayersService } from 'src/app/services/players/players.service';

// import { AvatarPickerModalPage } from '../../pages/avatar-picker-modal/avatar-picker-modal.page';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
// tslint:disable-next-line: no-input-rename
  @Input('save') save = true;
// tslint:disable-next-line: no-input-rename
  @Input('user') user
// tslint:disable-next-line: no-output-on-prefix
  @Output() onDismiss = new EventEmitter();


  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private auth: AuthenticationService,
    private helperService: HelperService,
    // private storage: Storage,
    // private playerService: PlayersService,
  ) { }
    public tempUser: User = {
      photoURL: '../../../assets/img/avatars/visored-helm.svg',
      color: '#3D9970',
      displayName: '',
      currentSession: null,
      isCurrent: null,
  }

  ngOnInit() {
    this.setUser();

  }
  ionViewWillEnter() {
    this.setUser();
  }
  async setUser(){
    const currentUser = await this.auth.getUser();
    this.tempUser = {
      uid: currentUser.uid,
      displayName: this.save ? currentUser.displayName : '',
      color: this.save ? currentUser.color : '#3D9970',
      photoURL: this.save ? currentUser.photoURL : '../../../assets/img/avatars/visored-helm.svg',
      currentSession: this.save ? currentUser.currentSession : null,
      isCurrent: this.save ? currentUser.isCurrent : null,
      isAnonymous: currentUser.isAnonymous,
    };

  }
  async getAvatar() {
    const modal = await this.modalController.create({
      component: ModalAvatarPickerPage,
      cssClass: '',
      componentProps: {
        color: this.tempUser.color
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.tempUser.photoURL = dataReturned.data;
      }
    });

    return await modal.present();

  }
  changeColor(color) {
    this.tempUser.color = color;
    let icon = document.getElementById('edit-icon');
    icon.style.backgroundColor = color;
    icon.style.color = this.helperService.getContrastYIQ(color.slice(1));

    let img = document.getElementById('edit-user-img');
    img.style.borderColor = color;
  }
  setName(displayName: string) {
    this.tempUser.displayName = displayName;
  }
  saveUser() {
    return this.auth.updateUserData(this.tempUser).then(() => {
      this.onDismiss.emit('dismiss')
    });
  }
}
