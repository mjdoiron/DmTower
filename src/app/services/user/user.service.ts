import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Events, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService,
    private router: Router,
    private events: Events,
    private nav: NavController,
  ) { }

  
  async updateCurrentSession(currentSessionID) {
    const user = await this.auth.getUser();
    user.currentSession = currentSessionID;

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = user;

    return userRef.set(data, { merge: true });

  }
  async leaveCurrentSession(){
    this.updateCurrentSession('').then(() => {
      this.nav.navigateBack('/home')
    });
  }

  private getUsersFor(sessionID:string) {
    return this.afs.collection<User>('users', (ref) => ref.where('currentSession', '==', sessionID)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data } as User;
        });
      })

    );
  }
  async getPlayersAndDm(session) {
    const currentUser = await this.auth.getUser();
    const users$ = this.getUsersFor(session.sessionID);
    const dm: Observable<User> = users$.pipe(
      map(users => {
        let dmToReturn: User
        users.forEach(user => {
          if (user.uid === session.dmID) {
            dmToReturn = user;
          }
        });
        if (dmToReturn) {
          dmToReturn.isCurrent = dmToReturn.uid === currentUser.uid;
          return dmToReturn;
        } else {
          return null
        }
      })
    );
    const players: Observable<User[]> = users$.pipe(
      map(users => {
        const filteredUsers = users.filter(user => user.uid !== session.dmID);
        filteredUsers.forEach(user => {
            user.isCurrent = user.uid === currentUser.uid;
          });
        return filteredUsers;
      })
    );
    return {dm, players};
  }
} 
