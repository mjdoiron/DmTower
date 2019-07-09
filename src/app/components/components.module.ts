import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PartyCardComponent } from './party-card/party-card.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [UserCardComponent, PartyCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule

  ],
  exports: [UserCardComponent, PartyCardComponent]
})
export class ComponentsModule { }
