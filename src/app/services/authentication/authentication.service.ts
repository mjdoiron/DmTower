import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { of } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { first, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';


const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<User>;


  constructor(
    private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }


  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  // private async oAuthLogin(provider) {
  //   return this.firebaseAuth.auth.signInWithPopup(provider)
  //     .then(async (credential) => {
  //       await this.updateUserData(credential.user);
  //       this.router.navigate(['home']);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }

  private async oAuthLogin(provider) {
    return this.firebaseAuth.auth.signInWithRedirect(provider)
      .then(async () => {
        this.firebaseAuth.auth.getRedirectResult().then(result => {
          this.updateUserData(result.user);
          this.router.navigate(['home']);
        });
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginAnonymously() {
    return this.firebaseAuth.auth.signInAnonymously()
      .then(async (credential) => {
        await this.updateUserData(credential.user);
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }


  async updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      currentSession: user.currentSession || null,
      isAnonymous: user.isAnonymous || null,
      color: user.color || null,
    };
    return userRef.set(data, { merge: true });

  }


  async logout() {
    await this.firebaseAuth.auth.signOut();
    return this.router.navigate(['/']);

  }
}

