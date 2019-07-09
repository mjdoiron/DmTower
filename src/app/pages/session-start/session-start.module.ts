import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { ComponentsModule } from 'src/app/components/components.module';

import { SessionStartPage } from './session-start.page';

const routes: Routes = [
  {
    path: '',
    component: SessionStartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxMaskIonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SessionStartPage]
})
export class SessionStartPageModule {}
