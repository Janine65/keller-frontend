import { Component, OnInit } from '@angular/core';
import { Place, Placetype, Subplace } from '@models/places';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Object2Subplace } from '@models/things';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { StringDatePipe } from '@shared/string-date.pipe';
import { MessageService, TreeNode, TreeTableNode } from 'primeng/api';
import { TreeTable } from 'primeng/treetable';
import { map, zip } from 'rxjs';

interface Column {
  field: string;
  header: string;
}

interface DropdownList {
  name: string;
  value: number;
  icon: string;
  disabled: boolean;
}

interface TreeData {
  name: string | undefined;
  type: string | undefined;
  id: number;
  count: number | undefined;
  icon: string  | undefined;
  shopped_at: string | undefined | null;
  valid_until: string | undefined | null;
}

@Component({
  selector: 'app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.css'],
})
export class AppDesktopComponent implements OnInit {

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

  selectedNode: TreeTableNode<any> | TreeTableNode<any>[] | null = null;

  isLoading = true;

  // Dialog Parameters
  showDialog = false;
  selSubplace : DropdownList | undefined;
  lSubPlaceSelect: DropdownList[] = []

  selObj2Sub: Object2Subplace = new Object2Subplace();

  constructor(
    private backendService: BackendService, 
    private authService: AuthService, 
    private messageService: MessageService,
    private stringDatePipe: StringDatePipe
    ) { 
    }

    reloadNodes() {
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

              this.lSubPlaceSelect = []
              this.selSubplace = undefined;
              this.lPlaces.forEach(place => {
                this.lSubplaces.forEach(sub => {
                    const placetype = this.lPlacetypes.find(pt => pt.id == place?.placetypeid)
                    if (sub.placeid == place.id) {
                    const rec: DropdownList = {icon: placetype!.icon, name: place.name + ' - ' + sub.name, value: sub.id!, disabled: false}
                    this.lSubPlaceSelect.push(rec)
                  }
                  });
              });

              let children: { data: TreeData }[] = []

              this.lKeller = [];
              let node: TreeNode;
              this.lAlcohoic.forEach((thing) => {
                children = []
                let total = 0
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.alcoholicid && obj2sub.alcoholicid == thing.id) {
                    total += obj2sub.count!;
                    const sub = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    const place = this.lPlaces.find(p => p.id == sub?.placeid)
                    const placetype = this.lPlacetypes.find(pt => pt.id == place?.placetypeid)
                    children.push({ data: { name: sub?.name, icon: placetype?.icon, type: place?.name, id: obj2sub.id!, count: obj2sub.count, shopped_at: this.stringDatePipe.transform(obj2sub.shopped_at, 'dd.MM.yyyy'), valid_until: this.stringDatePipe.transform(obj2sub.valid_until, 'dd.MM.yyyy') } })
                  }
                });
                node = {
                  data: {
                    id: thing.id,
                    name: thing.name,
                    type: 'Alcoholic',
                    count: total,
                    shopped_at: thing.weight
                  },
                  children: children
                };

                this.lKeller.push(node!);
              })
              this.lFood.forEach((thing) => {
                children = []
                let total = 0
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.foodid && obj2sub.foodid == thing.id) {
                    total += obj2sub.count!;
                    const sub = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    const place = this.lPlaces.find(p => p.id = sub?.placeid)
                    const placetype = this.lPlacetypes.find(pt => pt.id == place?.placetypeid)
                    children.push({ data: { name: sub?.name, icon: placetype?.icon, type: place?.name, id: obj2sub.id!, count: obj2sub.count, shopped_at: this.stringDatePipe.transform(obj2sub.shopped_at, 'dd.MM.yyyy'), valid_until: this.stringDatePipe.transform(obj2sub.valid_until, 'dd.MM.yyyy') } })
                  }
                });
                node = {
                  data: {
                    id: thing.id,
                    name: thing.name,
                    type: 'Food',
                    count: total,
                    shopped_at: thing.weight
                  },
                  children: children
                };

                this.lKeller.push(node!);
              })
              this.lNonalcohoic.forEach((thing) => {
                children = []
                let total = 0
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.nonalcoholicid && obj2sub.nonalcoholicid == thing.id) {
                    total += obj2sub.count!;
                    const sub = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    const place = this.lPlaces.find(p => p.id = sub?.placeid)
                    const placetype = this.lPlacetypes.find(pt => pt.id == place?.placetypeid)
                    children.push({ data: { name: sub?.name, icon: placetype?.icon ,type: place?.name, id: obj2sub.id!, count: obj2sub.count, shopped_at: this.stringDatePipe.transform(obj2sub.shopped_at, 'dd.MM.yyyy'), valid_until: this.stringDatePipe.transform(obj2sub.valid_until, 'dd.MM.yyyy') } })
                  }
                });
                node = {
                  data: {
                    id: thing.id,
                    name: thing.name,
                    type: 'Nonalcoholic',
                    count: total,
                    shopped_at: thing.weight
                  },
                  children: children
                };

                this.lKeller.push(node!);
              })
              this.lNonfood.forEach((thing) => {
                children = []
                let total = 0
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.nonfoodid && obj2sub.nonfoodid == thing.id) {
                    total += obj2sub.count!;
                    const sub = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    const place = this.lPlaces.find(p => p.id = sub?.placeid)
                    const placetype = this.lPlacetypes.find(pt => pt.id == place?.placetypeid)
                    children.push({ data: { name: sub?.name, icon: placetype?.icon, type: place?.name, id: obj2sub.id!, count: obj2sub.count, shopped_at: this.stringDatePipe.transform(obj2sub.shopped_at, 'dd.MM.yyyy'), valid_until: this.stringDatePipe.transform(obj2sub.valid_until, 'dd.MM.yyyy') } })
                  }
                });
                node = {
                  data: {
                    id: thing.id,
                    name: thing.name,
                    type: 'Nonfood',
                    count: total,
                    shopped_at: thing.weight
                  },
                  children: children
                };

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
      { field: 'type', header: 'Type / Place' },
      { field: 'count', header: 'Count' },
      { field: 'shopped_at', header: 'Weight / Bought at' },
      { field: 'valid_until', header: 'Valid until' }
    ];
    this.reloadNodes();
  }

  globalSearch(event: Event, tt: TreeTable) {
    return tt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  fieldSearch(event: Event, tt: TreeTable, field: string) {
    return tt.filter((event.target as HTMLInputElement).value, field, 'lenient')
  }

  onAddOnSubject(rowNode: TreeTableNode<any>) {
    if (rowNode.node!.data) {
      const data: TreeData = rowNode.node!.data as TreeData;

      this.selObj2Sub = new Object2Subplace()

      switch (data.type) {
        case 'Alcoholic':
          const alcoholic = this.lAlcohoic.find(al => al.id == data.id);
          this.selObj2Sub.alcoholicid = alcoholic?.id;
          break;

        case 'Food':
          const food = this.lFood.find(al => al.id == data.id);
          this.selObj2Sub.foodid = food?.id;

          break;

        case 'Nonalcoholic':
          const nonalcoholic = this.lNonalcohoic.find(al => al.id == data.id);
          this.selObj2Sub.nonalcoholicid = nonalcoholic?.id;

          break;

        case 'Nonfood':
          const nonfood = this.lNonfood.find(al => al.id == data.id);
          this.selObj2Sub.nonfoodid = nonfood?.id;

          break;
        default:
          break;
      }
      this.showDialog = true;
    }
  }

  saveSubplace() {
    if (this.selSubplace == undefined) {
      this.messageService.add({severity: 'error', summary: 'Add to Subplace', detail: 'Subplace must be selected'});
      return;
    }

    this.selObj2Sub.subplaceid = this.selSubplace.value;

    this.backendService.insertOject2Subplace(this.selObj2Sub).subscribe({
      next: (result) => {
        this.reloadNodes();
        this.showDialog = false;
      }
    });

  }

  onRemoveOne(rowNode: TreeNode, rowData: TreeData) {
    const obj2sub = this.lObj2Subl.find(o => o.id == rowData.id);
    if (obj2sub) {
      obj2sub.count = obj2sub.count ? obj2sub.count - 1 : 0;
      this.backendService.updateObject2Subplace(obj2sub).subscribe({
        next: (ret) => {
          const keller = this.lKeller.findIndex(kl => kl.data.id == rowNode.parent!.data.id);
          if (keller >= 0 && this.lKeller[keller].children) {
            const children = this.lKeller[keller].children;
            if (children != undefined) {
              const childInd = children.findIndex(child => child.data!.id == obj2sub.id)
              if (childInd != undefined && childInd >= 0) {
                children[childInd].data.count = obj2sub.count;
                this.lKeller[keller].children = children
                this.lKeller[keller].data.count = this.lKeller[keller].data.count ? this.lKeller[keller].data.count - 1 : 0
              }
              else console.log('child not found')
            }
          }
          else console.log('parent not found')
        }
      })
    }
  }

  onAddOne(rowNode: TreeNode, rowData: TreeData) {
    const obj2sub = this.lObj2Subl.find(o => o.id == rowData.id);
    if (obj2sub) {
      obj2sub.count = obj2sub.count ? obj2sub.count + 1 : 1;
      this.backendService.updateObject2Subplace(obj2sub).subscribe({
        next: (ret) => {
          const keller = this.lKeller.findIndex(kl => kl.data.id == rowNode.parent!.data.id);
          if (keller >= 0 && this.lKeller[keller].children) {
            const children = this.lKeller[keller].children;
            if (children != undefined) {
              const childInd = children.findIndex(child => child.data!.id == obj2sub.id)
              if (childInd != undefined && childInd >= 0) {
                children[childInd].data.count = obj2sub.count;
                this.lKeller[keller].children = children
                this.lKeller[keller].data.count = this.lKeller[keller].data.count ? this.lKeller[keller].data.count + 1 : 1
              }
              else console.log('child not found')
            }
          }
          else console.log('parent not found')
        }
      })
    }
  }
  delEntry(rowNode: TreeNode, rowData: TreeData) {
    const obj2sub = this.lObj2Subl.find(o => o.id == rowData.id);
    if (obj2sub) {
      this.backendService.deleteObject2Subplace(obj2sub).subscribe({
        next: (_) => {
        this.reloadNodes();
        }
      })
    }
  }
}
