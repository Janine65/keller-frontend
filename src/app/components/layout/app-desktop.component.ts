import { Component } from '@angular/core';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.css'],
})
export class AppDesktopComponent {
  constructor(private backendService: BackendService) {
    this.backendService.getPlaces().subscribe({
      next: (retData) => {
        console.log(retData.data);
      }
    })
  }
}
