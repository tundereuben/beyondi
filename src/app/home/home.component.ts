import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

import 'firebase/compat/firestore'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  loginForm!: FormGroup;
  public errors: Error = { email: '', password: ''};

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  loginUserIn() {
    const { email, password }= this.loginForm.getRawValue();
    const isEmailValid: boolean = this.validateEmail(email);
    const isPassWordValid: boolean = this.validatePassword(password);

    if (isEmailValid && isPassWordValid) {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
          const user = firebaseUser.user;
          if (user) {
            this.getUserDetails();
          }

        })
        .catch((error) => {
          console.error(error)
        });
    }
  }

  getUserDetails() {
    this.auth.currentUser.then((currentUser) => {
      if (currentUser) this.authService.fetchUserDetailsFromDb(currentUser?.uid)
    });
  }

  validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      this.errors.email = 'Email is invalid.';
      return false;
    }

    this.errors.email = '';
    return true;
  }

  validatePassword(password: string): boolean {
    const lowercaseRegex: RegExp = /[a-z]/;
    const uppercaseRegex: RegExp = /(?=(.*?[A-Z]){3})/;
    const numberRegex: RegExp = /[0-9]/;
    const symbolRegex: RegExp = /(?=(.*[`!@#$%\^&*\-_=\+'/\.,]){2})/

    if (password.length < 8 || !lowercaseRegex.test(password) ||
      !uppercaseRegex.test(password) || !numberRegex.test(password) ||
      !symbolRegex.test(password)) {
      const lengthError = password.length < 8 ? '8 characters' : '';
      const lowercaseError = !lowercaseRegex.test(password) ? ', one lowercase letter' : '';
      const uppercaseError = !uppercaseRegex.test(password) ? ', at least 3 uppercase letters' : '';
      const numberError = !numberRegex.test(password) ? ', one number' : '';
      const symbolError = !symbolRegex.test(password) ? ', two special characters': '';
      this.errors.password = "Password must contain: " + lengthError + lowercaseError + uppercaseError + numberError +  symbolError;
      return false;
    };

    this.errors.password = '';
    return true;
  }

  clearError(fieldName: string): void {
    fieldName === 'email' ? this.errors.email = '' : this.errors.password = '';
  }

}


export interface Error {
  email: string,
  password: string
}
