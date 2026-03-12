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
    const returnTo =
      window.location.hostname === 'mihaelaintech.github.io'
        ? 'https://mihaelaintech.github.io/biz-directory/'
        : window.location.origin;

    this.authService.logout({
      logoutParams: {
        returnTo: returnTo
      }
    });
  }

}