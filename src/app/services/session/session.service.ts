import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { firestore } from 'firebase/app';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, skipWhile, switchMap } from 'rxjs/operators';
import { Session } from 'src/app/models/session.model';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService,
    private router: Router,
    private events: Events,
  ) { }

  public wasNotFound$ = new Subject<boolean>();

  get(chatId) {
    return this.afs
      .collection<any>('sessions')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists == false) {
            this.wasNotFound$.next(true);
            return null;
          }
          this.wasNotFound$.next(false);
          this.events.publish('session', { sessionID: doc.payload.id, ...doc.payload.data() })

          return { sessionID: doc.payload.id, ...doc.payload.data() } as Session;
        })
      );
  }
  getSessionWithPassword(password: string) {
    return this.afs
      .collection<any>('sessions', (ref) => ref.where('password', '==', password))
      .snapshotChanges()
      .pipe(
        map(actions => {
          let sessions = actions.map(a => {
            const data = a.payload.doc.data();
            const sessionID = a.payload.doc.id;
            return { sessionID, ...data } as Session;
          });
          if (sessions.length == 0) {
            this.wasNotFound$.next(true);
            console.log('##### no sessions')
            return {}
          } else {
            this.wasNotFound$.next(false);
            this.events.publish('session', sessions[0]);
            return sessions[0] as Session;
          }
        })
      );
  }

  sessionExistsWithPassword(password: string) {
    return this.afs
      .collection<any>('sessions', (ref) => ref.where('password', '==', password))
      .snapshotChanges()
      .pipe(
        first(),
        map(sessions => {
          if (sessions.length == 0) {
            return false
          } else {
            return true
          }
        })
      ).toPromise()
  }


  async create() {
    const user = await this.auth.getUser();

    const data = {
      dmID: user.uid,
      createdAt: Date.now(),
      count: 0,
      messages: [],
      password: await this.generateCode()
    };

    const docRef = await this.afs.collection('sessions').add(data);

    return this.router.navigate(['session', data.password]);
  }

  async sendMessage(sessionID, content) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('sessions').doc(sessionID);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }


  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};
    return chat$.pipe(
      skipWhile(c => c.messages === undefined),
      switchMap(c => {
        chat = c;

        // Unique User IDs
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));

        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        })


        return chat;
      })
    );
  }
  async generateCode(): Promise<string> {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      i === 3 ? result += '-' : null;
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const exists = await this.sessionExistsWithPassword(result)

    if (exists) {
      return await this.generateCode();
    } else {
      return result;
    }
  }
}
