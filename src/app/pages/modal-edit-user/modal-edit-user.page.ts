import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.page.html',
  styleUrls: ['./modal-edit-user.page.scss'],
})
export class ModalEditUserPage implements OnInit {


  constructor(
    private modalController: ModalController,
    public platform: Platform) {
    }
    user: User;

  ngOnInit() {
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
