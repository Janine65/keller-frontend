import { Component, OnInit } from '@angular/core';
import pkg from '../../package.json'
import { PrimeNGConfig } from 'primeng/api';
import { AppPackage } from '@models/app-package';
import { BackendService } from '@services/backend.service';
import { tap } from 'rxjs';

@Component({
  selector: 'keller-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'keller-frontend';

  constructor(private primengConfig: PrimeNGConfig, private backendService: BackendService) {
    localStorage.setItem('aboutFrontend', JSON.stringify(pkg));

    this.backendService.getAbout().subscribe({
      next: (backend) => {
        localStorage.setItem('aboutBackend', JSON.stringify(backend));
      }
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
