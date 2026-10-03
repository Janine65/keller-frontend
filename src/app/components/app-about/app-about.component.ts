import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppPackage } from '@models/app-package';
import { Bind } from 'primeng/bind';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { Ripple } from 'primeng/ripple';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'keller-frontend-app-about',
    templateUrl: './app-about.component.html',
    styleUrls: ['./app-about.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [Bind, Tabs, TabList, Ripple, Tab, TabPanels, TabPanel, KeyValuePipe]
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
