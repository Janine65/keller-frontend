import { Component, OnInit } from '@angular/core';
import pkg from '../../package.json'
import { PrimeNG } from 'primeng/config';
import { BackendService } from '@services/backend.service';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Bind } from 'primeng/bind';
import { Toast } from 'primeng/toast';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { AppMenuComponent } from './components/layout/app-menu.component';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from './components/layout/app-footer.component';

@Component({
    selector: 'keller-frontend-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [Bind, Toast, ConfirmPopup, AppMenuComponent, RouterOutlet, AppFooterComponent]
})
export class AppComponent implements OnInit {
  title = 'keller-frontend';

  constructor(private primengConfig: PrimeNG, private backendService: BackendService, private cookieService: CookieService,
    library: FaIconLibrary
  ) {
    localStorage.setItem('aboutFrontend', JSON.stringify(pkg));
    library.addIconPacks(fas, far);
 
    firstValueFrom(this.backendService.getAbout()).then(
      (backend) => {
        localStorage.setItem('aboutBackend', JSON.stringify(backend));
      }
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple.set(true);
  }
}
