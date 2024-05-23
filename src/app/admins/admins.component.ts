import {Component, OnInit} from '@angular/core';

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import {User} from "../shared/data/User";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const snapshot = await firebase.firestore().collection('users').get();
    snapshot.forEach((doc) => {
      const user = doc.data();
      this.users.push({
        name : user['name'],
        email: user['email'],
        userType: user['userType'],
        uid: doc.id
      })
    });
  }
}
