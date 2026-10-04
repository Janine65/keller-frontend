import { LocationStrategy, HashLocationStrategy, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { GlobalErrorHandler } from '@interceptors/global-error-handler';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { JwtInterceptor } from '@interceptors/jwt.interceptor';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { APP_PRIMENG_PROVIDERS } from './app/app.module-primeng';
import { StringDatePipe } from './app/shared/string-date.pipe';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { bootstrapApplication } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withEnabledBlockingInitialNavigation, provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const KellerPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        }
    }
});

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),importProvidersFrom(CookieModule),
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        APP_PRIMENG_PROVIDERS,
        DatePipe, DecimalPipe, PercentPipe, StringDatePipe,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        providePrimeNG({
            license: 'eyJpZCI6IjkyYzFjYTlmLWY0NDQtNDA1Yy1iZThjLTliYWViZTM2MDJhNiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODQ5NzkyODksImV4cCI6MTgxNjUxNTI4OX0.hZ_pHnFRtNmqGT9u2C-335MBsqeLIiiO0MsDJAQCAqPwklSQY44M8_UHHJ-pzsis3NKdsNyxDyPOSCNwmNnDBw',
            theme: {
                preset: KellerPreset,
                options: {
                    darkModeSelector: false,
                    cssLayer: { name: 'primeng', order: 'theme, base, primeng' }
                }
            }
        }),
        provideAnimations(),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
    ]
})
  .catch((err) => console.error(err));
