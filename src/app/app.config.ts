import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import MyPreset from './theme.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: { 
        preset: MyPreset, 
        options: { 
          darkModeSelector: '.app-dark' 
        } 
      } 
    })
  ]

  
};
