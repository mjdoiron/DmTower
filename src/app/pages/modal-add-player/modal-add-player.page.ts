import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardService } from 'ngx-clipboard';
import { Session } from 'src/app/models/session.model';

@Component({
  selector: 'app-modal-add-player',
  templateUrl: './modal-add-player.page.html',
  styleUrls: ['./modal-add-player.page.scss'],
})
export class ModalAddPlayerPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private clipboard: Clipboard,
    public platform: Platform,
    private qrCode: QRCodeModule,
    private _clipboardService: ClipboardService,
    private emailComposer: EmailComposer,
    public toastController: ToastController
  ) { }
  private emailHref = "mailto:test@example.com?subject=subject&body=body"
  public session: Session
  ngOnInit() {
    console.table(this.navParams);
    this.session = this.navParams.data.session;
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  async copyToClipboard() {
    if (this.platform.is('cordova')) {
      this.clipboard.copy(this.session.password);
    } else {
      this._clipboardService.copyFromContent(this.session.password);
    }
    const toast = await this.toastController.create({
      header: 'Copied To Clipboard',
      // message: 'Click to Close',
      position: 'top',
      duration: 1500,
      showCloseButton: true,
    });
    toast.present();
  }

  sendCodeEmail() {
    if (this.platform.is("cordova")) {
      this.emailComposer.isAvailable().then((available: boolean) => {
        if (available) {
          let email = {
            subject: 'DmTower Session Invite',
            body: 'Join my DmTower Session! Code: ' + this.session.password,
            isHtml: true
          }
          this.emailComposer.open(email);
        } else {
          window.open('mailto:test@example.com?subject=subject&body=Join my DmTower Session! Code: ' + this.session.password);
        }
      }).catch(() => {
        console.log('EmailComposer.isAvailable error');
        window.location.href = 'mailto:test@example.com?subject=subject&body=Join my DmTower Session! Code: ' + this.session.password;
      });
    } else {
      console.log('Not Cordova');
      window.location.href = 'mailto:test@example.com?subject=subject&body=Join my DmTower Session! Code: ' + this.session.password;
    }
  }

  generateCode(): string {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      i === 3 ? result += '-' : null;
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}