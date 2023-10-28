import { Component } from '@angular/core';
import { Place } from '@models/places';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.css'],
})
export class AppDesktopComponent {
  
  lPlaces : Place[] = []

  constructor(private backendService: BackendService, private authService: AuthService) {

    this.authService.isLoggedIn().subscribe({
      next: (value) => {
        if (value)
          this.backendService.getPlaces().subscribe({
            next: (retData) => {
              this.lPlaces = retData.data; 
              console.log(retData.data);
            }
          })
        else {
          this.lPlaces = [];
        }
      }
    });
  }


}
