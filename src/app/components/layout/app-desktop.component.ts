import { Component, OnInit } from '@angular/core';
import { Icon, IconName } from '@fortawesome/fontawesome-svg-core';
import { Place, Placetype, Subplace } from '@models/places';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Object2Subplace } from '@models/things';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map, zip } from 'rxjs';

interface DropdownList {
  name: string;
  value: number;
  icon: IconName;
  disabled: boolean;
}

class ThingStruct {
  id: number | undefined;
  name: string | undefined;
  type: string | undefined;
  photo: string | undefined;
  icon: IconName | undefined;
  obj2sub: Object2Subplace | undefined;
  subplace: Subplace | undefined;
  place: Place | undefined;
  placetype: Placetype | undefined;
}

@Component({
  selector: 'app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.css'],
})
export class AppDesktopComponent implements OnInit {

  lPlaces: Place[] = [];
  lSubplaces: Subplace[] = [];
  lPlacetypes: Placetype[] = [];
  lAlcohoic: Alcoholic[] = [];
  lFood: Food[] = [];
  lNonalcohoic: Nonalcoholic[] = [];
  lNonfood: Nonfood[] = [];
  lObj2Subl: Object2Subplace[] = [];

  lThingsList: ThingStruct[] = [];
  lAllThingsList: ThingStruct[] = [];
  selThing: ThingStruct | undefined;

  isLoading = true;
  preventSingleClick = false;
  timer: any;
  delay: Number = 200;

  fDisplayAll = false

  // Dialog Parameters
  showDialog = false;
  selSubplace: DropdownList | undefined;
  lSubPlaceSelect: DropdownList[] = []

  selObj2Sub: Object2Subplace = new Object2Subplace();

  thingsTypes = [
    { label: 'Alcoholic', value: 'Alcoholic', icon: 'wine-bottle' as IconName },
    { label: 'Food', value: 'Food', icon: 'pizza-slice' as IconName },
    { label: 'Nonalcoholic', value: 'Nonalcoholic', icon: 'bottle-water' as IconName },
    { label: 'Nonfood', value: 'Nonfood', icon: 'toilet-paper' as IconName }
  ]
  thingType = ''
  selTypes: string[] = [this.thingsTypes[0].label, this.thingsTypes[1].label,this.thingsTypes[2].label,this.thingsTypes[3].label]

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
              this.lObj2Subl.forEach((obj) => {
                if (obj.valid_until && obj.valid_until != '') {
                  const date = Date.parse(obj.valid_until);
                  obj.valid_until_date = new Date(date);
                }
              })

              this.lSubPlaceSelect = []
              this.selSubplace = undefined;
              this.lPlaces.forEach(place => {
                const placetype = this.lPlacetypes.find(pt => pt.id == place?.placetypeid)
                this.lSubplaces.forEach(sub => {
                  if (sub.placeid == place.id) {
                    const rec: DropdownList = { name: place.name + ' - ' + sub.name, icon: placetype!.icon!, value: sub.id!, disabled: false }
                    this.lSubPlaceSelect.push(rec)
                  }
                });
              });

              this.lAllThingsList = [];

              this.lAlcohoic.forEach((thing) => {
                let thingElem = new ThingStruct();
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[0].label;
                thingElem.icon = this.thingsTypes[0].icon as IconName;
                this.lAllThingsList.push(thingElem)

                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.alcoholicid && obj2sub.alcoholicid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[0].label;
                    thingElem.icon = this.thingsTypes[0].icon as IconName;
                    thingElem.obj2sub = obj2sub;
                    thingElem.subplace = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    thingElem.place = this.lPlaces.find(p => p.id == thingElem.subplace?.placeid)
                    thingElem.placetype = this.lPlacetypes.find(pt => pt.id == thingElem.place?.placetypeid)
                    this.lAllThingsList.push(thingElem)
                  }
                });
              })
              this.lFood.forEach((thing) => {
                let thingElem = new ThingStruct();
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[1].label;
                thingElem.icon = this.thingsTypes[1].icon as IconName;
                this.lAllThingsList.push(thingElem)

                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.foodid && obj2sub.foodid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[1].label;
                    thingElem.icon = this.thingsTypes[1].icon as IconName;
                    thingElem.obj2sub = obj2sub;
                    thingElem.subplace = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    thingElem.place = this.lPlaces.find(p => p.id == thingElem.subplace?.placeid)
                    thingElem.placetype = this.lPlacetypes.find(pt => pt.id == thingElem.place?.placetypeid)
                    this.lAllThingsList.push(thingElem)
                  }
                });
              })
              this.lNonalcohoic.forEach((thing) => {
                let thingElem = new ThingStruct();
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[2].label;
                thingElem.icon = this.thingsTypes[2].icon as IconName;
                this.lAllThingsList.push(thingElem)
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.nonalcoholicid && obj2sub.nonalcoholicid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[2].label;
                    thingElem.icon = this.thingsTypes[2].icon as IconName;
                    thingElem.obj2sub = obj2sub;
                    thingElem.subplace = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    thingElem.place = this.lPlaces.find(p => p.id == thingElem.subplace?.placeid)
                    thingElem.placetype = this.lPlacetypes.find(pt => pt.id == thingElem.place?.placetypeid)
                    this.lAllThingsList.push(thingElem)
                  }
                });
              })
              this.lNonfood.forEach((thing) => {
                let thingElem = new ThingStruct();
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[3].label;
                thingElem.icon = this.thingsTypes[3].icon as IconName;
                this.lAllThingsList.push(thingElem)
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.nonfoodid && obj2sub.nonfoodid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[3].label;
                    thingElem.icon = this.thingsTypes[3].icon as IconName;
                    thingElem.obj2sub = obj2sub;
                    thingElem.subplace = this.lSubplaces.find(s => s.id == obj2sub.subplaceid);
                    thingElem.place = this.lPlaces.find(p => p.id == thingElem.subplace?.placeid)
                    thingElem.placetype = this.lPlacetypes.find(pt => pt.id == thingElem.place?.placetypeid)
                    this.lAllThingsList.push(thingElem)
                  }
                });
              })
              this.sortList();
              this.filterList();
              this.isLoading = false;
            })).subscribe()
        else {
          this.lAllThingsList = [];
        }
      }
    });
  }

  sortList() {
    this.lAllThingsList.sort((a, b) => {
      if (a.name! < b.name!)
        return -1;
      if (a.name! > b.name!)
        return 1;
      if (a.name! === b.name!)
        if (a.obj2sub)
          return -1
        else
          if (b.obj2sub)
            return 1;
          else
            return 0;
      return 0;
    })
  }

  filterList() {
    this.lThingsList = this.lAllThingsList.filter((value) => this.selTypes.includes(value.type!))
    if (!this.fDisplayAll)
      this.lThingsList = this.lThingsList.filter((value) => value.obj2sub != undefined)

  }

  selectType(type: any) {
    this.selTypes.push(type);
  }

  ngOnInit(): void {
    this.reloadNodes();
  }

  onAddOnSubject() {
    if (!this.selThing)
      return;

    this.selObj2Sub = new Object2Subplace()
    switch (this.selThing!.type) {
      case 'Alcoholic': {
        this.selObj2Sub.alcoholicid = this.selThing.id;
        break;
      }
      case 'Food': {
        this.selObj2Sub.foodid = this.selThing.id;
        break;
      }
      case 'Nonalcoholic': {
        this.selObj2Sub.nonalcoholicid = this.selThing.id;

        break;
      }
      case 'Nonfood': {
        this.selObj2Sub.nonfoodid = this.selThing.id;

        break;
      }
      default:
        break;
    }
    this.showDialog = true;
  }

  saveSubplace() {
    if (this.selSubplace == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Add to Subplace', detail: 'Subplace must be selected' });
      return;
    }
    this.selObj2Sub.subplaceid = this.selSubplace.value;
    this.backendService.insertOject2Subplace(this.selObj2Sub).subscribe({
      next: (result) => {
        this.showDialog = false;
        const thing: ThingStruct = Object.assign({}, this.selThing);
        thing.obj2sub = result.data as Object2Subplace
        thing.subplace = this.lSubplaces.find(s => s.id == thing.obj2sub!.subplaceid);
        thing.place = this.lPlaces.find(p => p.id == thing.subplace?.placeid)
        thing.placetype = this.lPlacetypes.find(pt => pt.id == thing.place?.placetypeid)
        this.lAllThingsList.push(thing)
        this.sortList();
        this.filterList();
      }
    });

  }

  onRemoveOne(data: ThingStruct, event: Event) {
    this.preventSingleClick = false;
    const delay = 200;
    this.timer = setTimeout(() => {
      if (!this.preventSingleClick) {
        if (data.obj2sub) {
          if (data.obj2sub.count == 0) {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: 'Do you want to delete this record?',
              icon: 'pi pi-question',
              acceptButtonStyleClass: 'p-button-danger p-button-sm',
              accept: () => {
                this.backendService.deleteObject2Subplace(data.obj2sub!).subscribe({
                  next: () => {
                    let ind = this.lAllThingsList.findIndex((thing) => thing.id == data.id && thing.obj2sub == data.obj2sub);
                    this.lAllThingsList.splice(ind, 1)  
                    ind = this.lThingsList.findIndex((thing) => thing.id == data.id && thing.obj2sub == data.obj2sub);
                    this.lThingsList.splice(ind, 1)  
                  }
                });  
              },
              reject: () => {
                  return;
              }
          });
          } else {
            data.obj2sub.count = data.obj2sub.count ? data.obj2sub.count - 1 : 0;
            this.backendService.updateObject2Subplace(data.obj2sub).subscribe({
              next: (ret) => {
              }
            })
          }
        }
      }
    }, delay);
  }

  onAddOne(data: ThingStruct) {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    if (data.obj2sub) {
      data.obj2sub.count = data.obj2sub.count ? data.obj2sub.count + 1 : 1;
      this.backendService.updateObject2Subplace(data.obj2sub).subscribe({
        next: (ret) => {
        }
      })
    } else {
      this.selThing = data;
      this.onAddOnSubject();
    }
  }

  isValidPast(data: ThingStruct) {
    const now = new Date()
    if (data.obj2sub && data.obj2sub.valid_until_date) {
      const timeNow = now.getTime();
      const timeValid = data.obj2sub.valid_until_date.getTime()
      if (timeNow > timeValid)
        return true;
      else
        return false;
      }
    
    return false
  }

}
