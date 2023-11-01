import { Component, OnInit } from '@angular/core';
import { Place, Placetype, Subplace } from '@models/places';
import { Object2Subplace, Thing } from '@models/things';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { TreeNode } from 'primeng/api';
import { map, zip } from 'rxjs';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.css'],
})
export class AppDesktopComponent implements OnInit{

  lKeller: TreeNode[] = [];
  cols: Column[] = [];

  lPlaces: Place[] = [];
  lSubplaces: Subplace[] = [];
  lPlacetypes: Placetype[] = [];
  lThings: Thing[] = [];
  lObj2Subl: Object2Subplace[] = [];

  isLoading = true;

  constructor(private backendService: BackendService, private authService: AuthService) {

    this.authService.isLoggedIn().subscribe({
      next: (value) => {
        this.isLoading = true;
        if (value)
          zip(this.backendService.getPlaces(), 
              this.backendService.getSubplaces(), 
              this.backendService.getPlacetypes(),
              this.backendService.getThings(),
              this.backendService.getAllThing2Subplaces())
            .pipe(map(([placeReturn, subplaceReturn, placetypeReturn, thingsReturn, obj2subReturn]) => {
              this.lPlaces = placeReturn.data as Place[];
              this.lSubplaces = subplaceReturn.data as Subplace[];
              this.lPlacetypes = placetypeReturn.data as Placetype[];
              this.lThings = thingsReturn.data as Thing[];
              this.lObj2Subl = obj2subReturn.data as Object2Subplace[];

              this.lKeller = [];

              this.isLoading = false;
            })).subscribe()
        else {
          this.lPlaces = [];
          this.lPlacetypes = [];
          this.lSubplaces = [];
          this.lThings = [];
          this.lObj2Subl = [];

          this.lKeller = [];
        }
      }
    });
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'count', header: 'Count' },
      { field: 'subplace', header: 'Subplace' },
      { field: 'place', header: 'Place'}
    ];
  }


}
