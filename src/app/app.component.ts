import { Component, OnInit } from '@angular/core';
import pkg from '../../package.json'
import { PrimeNGConfig } from 'primeng/api';
import { BackendService } from '@services/backend.service';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'keller-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'keller-frontend';

  constructor(private primengConfig: PrimeNGConfig, private backendService: BackendService, private cookieService: CookieService) {
    localStorage.setItem('aboutFrontend', JSON.stringify(pkg));

    firstValueFrom(this.backendService.getAbout()).then(
      (backend) => {
        localStorage.setItem('aboutBackend', JSON.stringify(backend));
      }
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
