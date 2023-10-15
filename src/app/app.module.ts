import { ErrorHandler, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, CommonModule, DecimalPipe, DatePipe, PercentPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  APP_PRIMENG_MODULE,
  APP_PRIMENG_PROVIDERS,
} from './app.module-primeng';
import { AppMenuComponent } from './components/layout/app-menu.component';
import { AppDesktopComponent } from './components/layout/app-desktop.component';
import { AppFooterComponent } from './components/layout/app-footer.component';
import { AppAboutComponent } from './components/app-about/app-about.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { GlobalErrorHandler } from '@interceptors/global-error-handler';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { JwtInterceptor } from '@interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppDesktopComponent,
    AppFooterComponent,
    AppAboutComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DecimalPipe,
    DatePipe,
    PercentPipe,
    APP_PRIMENG_MODULE,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    APP_PRIMENG_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
