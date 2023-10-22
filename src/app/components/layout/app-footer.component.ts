import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { AppPackage } from '@models/app-package';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
})
export class AppFooterComponent implements AfterContentInit {
  versionFrontend = '';
  versionBackend = '';
  appName = '';

  ngAfterContentInit() {
    interval(500).pipe(take(1)).subscribe(value => {
      const pkgFrontString = localStorage.getItem('aboutFrontend');
      let pkgFront: AppPackage = {};
      if (pkgFrontString) {
        pkgFront = JSON.parse(pkgFrontString);
        this.versionFrontend = pkgFront.version ?? '';
        this.appName = pkgFront.displayName ?? '';
      }

      const pkgBackendString = localStorage.getItem('aboutBackend');
      let pkgBackend: AppPackage = {};
      if (pkgBackendString) {
        pkgBackend = JSON.parse(pkgBackendString);
        this.versionBackend = pkgBackend.version ?? '';
      }

    });

  }

}
