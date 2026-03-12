import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-orl7yj45205nf4fo.us.auth0.com',
      clientId: 'mcYW7fVW0kJDbwpP6iwIKJyzdugiFWhU',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};