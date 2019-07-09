import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';

import { ModalEditUserPage } from './modal-edit-user.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalEditUserPage],
  entryComponents: [
    ModalEditUserPage
  ]
})
export class ModalEditUserPageModule {}
