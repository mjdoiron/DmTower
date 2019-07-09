import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { Session } from 'src/app/models/session.model';
import { HelperService } from 'src/app/services/helper/helper.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-session-start',
  templateUrl: './session-start.page.html',
  styleUrls: ['./session-start.page.scss'],
})
export class SessionStartPage implements OnInit {
  @ViewChild(UserCardComponent) userCard: UserCardComponent;


  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private userService: UserService,
    public nav: NavController,
    private menu: MenuController) {
  }

  public pageType: string;
  public typedPassword: string;
  public session: Session = {
    password: '',
  };

  ngOnInit() {
    this.getParam();
    this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.getParam();
    this.menu.enable(false);

  }
  getParam() {
    this.pageType = null;
    const type = this.route.snapshot.paramMap.get('type');
    if (type) {
      this.pageType = type;
    } else {
      this.nav.navigateBack('/home');
    }

  }
  joinSession() {
    this.sessionService.getSessionWithPassword(this.typedPassword).subscribe(session => {
      console.log(session.sessionID)
      if (session.sessionID !== undefined) {
        this.userCard.saveUser().then(() => {
          this.router.navigate(['session', session.password]);
        });
      } else {
        this.helperService.showToast('Could Not Find Session')
        this.typedPassword = ''
      }
    });
  }

  startSession() {
    this.userCard.saveUser().then(() => {
      this.sessionService.create();
    });
  }
}
