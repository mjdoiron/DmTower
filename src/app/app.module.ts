import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LoginPageModule } from './pages/login/login.module';
import { LoginPage } from './pages/login/login.page';
import { ModalAddPlayerPageModule } from './pages/modal-add-player/modal-add-player.module';
import { ModalAddPlayerPage } from './pages/modal-add-player/modal-add-player.page';
import { ModalAvatarPickerPageModule } from './pages/modal-avatar-picker/modal-avatar-picker.module';
import { ModalAvatarPickerPage } from './pages/modal-avatar-picker/modal-avatar-picker.page';
import { ModalEditUserPageModule } from './pages/modal-edit-user/modal-edit-user.module';
import { ModalEditUserPage } from './pages/modal-edit-user/modal-edit-user.page';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [LoginPage, ModalEditUserPage, ModalAddPlayerPage, ModalAvatarPickerPage],
  imports: [
    ComponentsModule,
    LoginPageModule,
    ModalEditUserPageModule,
    ModalAddPlayerPageModule,
    ModalAvatarPickerPageModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxMaskIonicModule.forRoot(),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    NgxMaskIonicModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
