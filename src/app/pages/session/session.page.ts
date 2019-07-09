import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, IonContent, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  // @ViewChildren('chatList') chatList: ElementRef;
  // @ViewChildren(IonList, { read: ElementRef }) chatList2: QueryList<ElementRef>;

  public session$: Observable<Session>;
  public wasNotFound$: Observable<boolean>;
  public newMsg: string;
  public typedID: string;
  public currentUser: User


  constructor(
    public sessionService: SessionService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private router: Router,
    private events: Events,
    private userService: UserService,
    private menu: MenuController,
    private nav: NavController,
    public helperService: HelperService,
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    let sessionPassword = this.route.snapshot.paramMap.get('password');
    if (sessionPassword) {
      this.setUser()
      // const session$ = this.sessionService.get(sessionPassword);
      const session$ = this.sessionService.getSessionWithPassword(sessionPassword)
      this.wasNotFound$ = this.sessionService.wasNotFound$;
      this.session$ = this.sessionService.joinUsers(session$);
      // this.mutationObserver = new MutationObserver((mutations) => {
      //   this.content.scrollToBottom();
      // });
      this.session$.subscribe(() => {
        this.content.scrollToBottom(300)
      })
      setTimeout(() => {
        console.log('test')
        this.content.scrollToBottom();
      }, 500);
  
    } else {
      this.router.navigate(['home'])
    }
  }
  async setUser(){
    this.currentUser = await this.auth.getUser()
  }

  submit(sessionID) {
    if (this.newMsg != '') {
      this.sessionService.sendMessage(sessionID, this.newMsg);
    }
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }
  joinSession() {
    this.router.navigate(['session', this.typedID]);
  }
  leaveSession() {
    this.userService.leaveCurrentSession();
  }
}
