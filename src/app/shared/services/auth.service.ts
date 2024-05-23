import {EventEmitter, Injectable, Output} from '@angular/core';

import {AngularFireAuth,} from "@angular/fire/compat/auth";
import {User} from "../data/User";
import {Observable, of} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loginDetails: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFireStorage,
    private router: Router
  ) { }

  /*login(email: string, password: string) { // todo: add return type
    this.auth.signInWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        const user = firebaseUser.user;
        // console.log(`firebase user >>> `, user);
        this.getUserDetails();
      })
      .catch((error) => {
        console.error(error)
      });
  }*/

  /*getUserDetails() {
    this.auth.currentUser.then((currentUser) => {
      const user = {
        displayName: currentUser?.displayName,
        email: currentUser?.email,
        phoneNumber: currentUser?.phoneNumber,
        metadata: currentUser?.metadata,
        providerData: currentUser?.providerData,
        photoURL: currentUser?.photoURL,
        uid: currentUser?.uid
      }
      sessionStorage.setItem('user', JSON.stringify(user));
      console.log(`current user for session >>> `, user);
    })
  }*/

  getLoggedInUserDetails(): Observable<User> {
    const sessionUser = sessionStorage.getItem('user');
    this.loginDetails.emit(sessionUser ? JSON.parse(sessionUser) : null)
    console.log(`session user`, this.loginDetails)
    // return this.loginDetails
    return of(sessionUser ? JSON.parse(sessionUser) : null)
  }

  isLoggedIn(): Observable<boolean> {
    return of(sessionStorage.getItem('user') !== null);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.auth.signOut();
  }

  async getUsersFromDb() {
    const snapshot = await firebase.firestore().collection('users').get();

    snapshot.forEach((doc) => {
      console.log(doc.data())
    });
  }

  fetchUserDetailsFromDb(uid: string) {
    firebase.firestore().collection('users').doc(uid)
      .get().then((doc) => {
      const dbUser = doc.data();

      if (dbUser) {
        const user: User = {
          name: dbUser['name'],
          email: dbUser['email'],
          userType: dbUser['userType'],
          uid: uid
        }
        sessionStorage.setItem('user', JSON.stringify(user));
        this.getLoggedInUserDetails();
        console.log(`current user for session >>> `, user);
        this.router.navigate(['products']);
      }

    })
  }

}
