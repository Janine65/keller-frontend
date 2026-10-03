import { LocationStrategy, HashLocationStrategy, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { GlobalErrorHandler } from '@interceptors/global-error-handler';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from '@interceptors/jwt.interceptor';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { APP_PRIMENG_PROVIDERS } from './app/app.module-primeng';
import { StringDatePipe } from './app/shared/string-date.pipe';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { bootstrapApplication } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withEnabledBlockingInitialNavigation, provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),importProvidersFrom(CookieModule),
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        APP_PRIMENG_PROVIDERS,
        DatePipe, DecimalPipe, PercentPipe, StringDatePipe,
        provideHttpClient(withInterceptorsFromDi()),
        providePrimeNG({ theme: { preset: Aura } }),
        provideAnimations(),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
    ]
})
  .catch((err) => console.error(err));
