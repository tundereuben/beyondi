import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css']
})
export class AdminNewComponent implements OnInit {

  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.createAdminForm();
  }

  createAdminForm() {
    this.adminForm = this.fb.group({
      name: [''],
      email: [''],
      userType: ['']
    })
  }

  clearError(productName: string) {

  }


  createAdmin() {
    const { name, email, userType } = this.adminForm.getRawValue();

    this.auth.createUserWithEmailAndPassword(email, 'lagos222GGG##')
      .then(res => {
        firebase.firestore().collection('users').add({ name, email, userType })
      })

    console.log(this.adminForm.getRawValue())
  }

}
