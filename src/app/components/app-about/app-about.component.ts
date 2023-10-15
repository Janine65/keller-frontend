import { Component, OnInit } from '@angular/core';
import { AppPackage } from '@models/app-package';

@Component({
  selector: 'keller-frontend-app-about',
  templateUrl: './app-about.component.html',
  styleUrls: ['./app-about.component.css'],
})
export class AppAboutComponent implements OnInit {
  pkgFrontend: AppPackage = {};
  pkgBackend: AppPackage = {};

  ngOnInit(): void {
    const pkgFrontString = localStorage.getItem('aboutFrontend');    
    if (pkgFrontString) {
        this.pkgFrontend = JSON.parse(pkgFrontString);
    }

    const pkgBackendString = localStorage.getItem('aboutBackend');    
    if (pkgBackendString) {
        this.pkgBackend = JSON.parse(pkgBackendString);
    }      
  }
}
