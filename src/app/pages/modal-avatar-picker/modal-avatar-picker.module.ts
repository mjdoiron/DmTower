import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAvatarPickerPage } from './modal-avatar-picker.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAvatarPickerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAvatarPickerPage]
})
export class ModalAvatarPickerPageModule {}
