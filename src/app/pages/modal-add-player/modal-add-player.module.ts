import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';

import { ModalAddPlayerPage } from './modal-add-player.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddPlayerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Clipboard,
    EmailComposer
  ],
  declarations: [ModalAddPlayerPage],
  entryComponents: [
    ModalAddPlayerPage
  ]
})
export class ModalAddPlayerPageModule {}
