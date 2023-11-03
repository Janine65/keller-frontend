import { Component, OnInit } from '@angular/core';
import { Place, Placetype, Subplace } from '@models/places';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Object2Subplace } from '@models/things';
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
  lAlcohoic: Alcoholic[] = [];
  lFood: Food[] = [];
  lNonalcohoic: Nonalcoholic[] = [];
  lNonfood: Nonfood[] = [];
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
              this.backendService.getAlcoholics(),
              this.backendService.getFood(),
              this.backendService.getNonalcoholics(),
              this.backendService.getNonfood(),
              this.backendService.getAllThing2Subplaces())
            .pipe(map(([placeReturn, subplaceReturn, placetypeReturn, alcoholicReturn, foodReturn, nonalcoholicReturn, nonfoodReturn, obj2subReturn]) => {
              this.lPlaces = placeReturn.data as Place[];
              this.lSubplaces = subplaceReturn.data as Subplace[];
              this.lPlacetypes = placetypeReturn.data as Placetype[];
              this.lAlcohoic = alcoholicReturn.data as Alcoholic[];
              this.lFood = foodReturn.data as Food[];
              this.lNonalcohoic = nonalcoholicReturn.data as Nonalcoholic[];
              this.lNonfood = nonfoodReturn.data as Nonfood[];
              this.lObj2Subl = obj2subReturn.data as Object2Subplace[];

              this.lKeller = [];
              let node : TreeNode
              this.lAlcohoic.forEach((thing) => {
                const children: { data: { name: string | undefined; count: number | undefined; place: string | undefined; }; }[] = []
                let total = 0
                this.lObj2Subl.forEach(obj2sub => {
                  total += obj2sub.count!;
                  const sub = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                  const place = this.lPlaces.find(p => p.id = sub?.placeid)
                  children.push({ data: { name: sub?.name, count: obj2sub.count, place: place?.name}})
                });
                node = {
                  data:{  
                      name: thing.name,
                      type: 'Alcoholic',
                      count: total,
                      place: ''
                  },
                  children: children };

                this.lKeller.push(node!);
                      
              })

              this.isLoading = false;
            })).subscribe()
        else {
          this.lKeller = [];
        }
      }
    });
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'count', header: 'Count' },
      { field: 'place', header: 'Place'}
    ];
  }


}
