import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private authService: AuthService, private router: Router) { }
  
  async handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;

    if (error instanceof HttpErrorResponse) {
      if (error.status == 401) {
        this.authService.logout();
      }
      // Server error
      message = errorService.getServerErrorMessage(error);
      notifier.showError(message);
      console.debug(message);
      if (message == 'Authentication token missing') {
        this.authService.logout();
        await this.router.navigate(['/user/login']);
      }
    } else {
      // Client Error
      console.debug(error.message);
      if (error.message == 'Wrong authentication token' || error.message == 'Authentication token missing') {
        this.authService.logout();
        this.router.navigate(['/user/login']);
      }
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
    // Always log errors
    logger.logError(message);
    console.error(error);
  }
}
