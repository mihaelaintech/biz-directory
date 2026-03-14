import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent {

  constructor(public authService: AuthService) {}

  logout() {

    let returnUrl = '';

    if (window.location.hostname === 'localhost') {
      returnUrl = 'http://localhost:4201';
    } else {
      returnUrl = 'https://mihaelaintech.github.io/biz-directory/';
    }

    this.authService.logout({
      logoutParams: {
        returnTo: returnUrl
      }
    });

  }

}
