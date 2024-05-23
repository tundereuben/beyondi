import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/data/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: User | null;
  isUserLoggedIn: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.user = {}
  }
  ngOnInit(): void {
    // this.getUserDetails();
    this.isLoggedIn();
  }

  getUserDetails(): void {
    /*if (this.isUserLoggedIn) {
      this.authService.getLoggedInUserDetails()
        .subscribe({
          next: (user) => {
            this.user = user;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);
          }
        })
    }*/

    if (this.authService.isLoggedIn()) {
      this.authService.loginDetails.subscribe({
        next: (res: User) => {
          this.user = res
        },
        error: (err: Error) => {
          console.error(err);
        }
      })
    }
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn()
      .subscribe({
        next: (isLoggedIn) => {
          this.isUserLoggedIn = isLoggedIn;
          this.getUserDetails();
        },
        error: (err) => {
          console.error(err);
        }
      })
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
    this.cdr.detectChanges();
    console.log(`logged in `, this.isUserLoggedIn);
  }
}
