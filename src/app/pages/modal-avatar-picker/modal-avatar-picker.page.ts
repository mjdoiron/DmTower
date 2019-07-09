import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-modal-avatar-picker',
  templateUrl: './modal-avatar-picker.page.html',
  styleUrls: ['./modal-avatar-picker.page.scss'],
})
export class ModalAvatarPickerPage implements OnInit {
  avatars = [
    './assets/img/avatars/barbarian.svg',
    './assets/img/avatars/barbute.svg',
    './assets/img/avatars/brutal-helm.svg',
    './assets/img/avatars/cowled.svg',
    './assets/img/avatars/crowned-skull.svg',
    './assets/img/avatars/cultist.svg',
    './assets/img/avatars/diablo-skull.svg',
    './assets/img/avatars/dragon-head.svg',
    './assets/img/avatars/dwarf-face.svg',
    './assets/img/avatars/dwarf-helmet.svg',
    './assets/img/avatars/dwarf-king.svg',
    './assets/img/avatars/elf-helmet.svg',
    './assets/img/avatars/executioner-hood.svg',
    './assets/img/avatars/female-vampire.svg',
    './assets/img/avatars/fish-monster.svg',
    './assets/img/avatars/goblin-head.svg',
    './assets/img/avatars/golem-head.svg',
    './assets/img/avatars/kenku-head.svg',
    './assets/img/avatars/monk-face.svg',
    './assets/img/avatars/nun-face.svg',
    './assets/img/avatars/ogre.svg',
    './assets/img/avatars/orc-head.svg',
    './assets/img/avatars/overlord-helm.svg',
    './assets/img/avatars/troll.svg',
    './assets/img/avatars/vampire-dracula.svg',
    './assets/img/avatars/visored-helm.svg',
    './assets/img/avatars/warlock-hood.svg',
    './assets/img/avatars/witch-face.svg',
    './assets/img/avatars/wizard-face.svg',
    './assets/img/avatars/woman-elf-face.svg',
  ];
  constructor(
    private modalController: ModalController,
    private helperService: HelperService) { }

  ngOnInit() {
  }
  async setAvatar(avatar) {
    await this.modalController.dismiss(avatar);
    this.helperService.showToast('Avatar Changed');
  }

}
