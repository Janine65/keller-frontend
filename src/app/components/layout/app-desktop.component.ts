import { Component, OnInit, ViewChild } from '@angular/core';
import { ThingEditComponent } from '@components/thing-edit/thing-edit.component';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Place, Placetype, Subplace } from '@models/places';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Object2Subplace, Thing } from '@models/things';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { DialogService } from 'primeng/dynamicdialog';
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
  thing: Thing | undefined;
  obj2sub: Object2Subplace | undefined;
  subplace: Subplace | undefined;
  place: Place | undefined;
  placetype: Placetype | undefined;
}

@Component({
  selector: 'app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.css'],
  providers: [DialogService]
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

  cmObj2Sub: MenuItem[] = [];

  isLoading = true;
  preventSingleClick = false;
  timer: any;
  delay: number = 200;

  sortOptions: any[] = [{ label: 'A-Z', value: 1 }, { label: 'Severity', value: 2 }];
  sorting = 1;

  fDisplayAll = false

  // Dialog Parameters
  showDialog = false;
  selSubplace: DropdownList | undefined;
  lSubPlaceSelect: DropdownList[] = []

  searchText = '';

  selObj2Sub: Object2Subplace = new Object2Subplace();

  thingsTypes = [
    { label: 'Alcoholic', value: 'Alcoholic', icon: 'wine-bottle' as IconName },
    { label: 'Food', value: 'Food', icon: 'pizza-slice' as IconName },
    { label: 'Nonalcoholic', value: 'Nonalcoholic', icon: 'bottle-water' as IconName },
    { label: 'Nonfood', value: 'Nonfood', icon: 'toilet-paper' as IconName }
  ]
  thingType = ''
  selTypes: string[] = [this.thingsTypes[0].label, this.thingsTypes[1].label, this.thingsTypes[2].label, this.thingsTypes[3].label]

  @ViewChild('contextmenu') public cm?: ContextMenu;

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {
    this.cmObj2Sub = [
      {
        label: 'Add One', icon: 'pi pi-plus',
        command: (event) => {
          this.onAddOne(this.selThing!);
        }
      },
      {
        label: 'Remove One', icon: 'pi pi-minus',
        command: (event) => {
          this.onRemoveOne(this.selThing!, event as Event);
        }
      },
      { separator: true },
      {
        label: 'Update', icon: 'pi pi-pencil',
        command: (event) => {
          this.onUpdateOnSubject();
        }
      },
      { separator: true },
      {
        label: 'Update Thing', icon: 'pi pi-search',
        command: (event) => {
          this.onUpdateThing();
        }
      }
    ]
  }

  showContextMenu(data: ThingStruct, event: any) {
    this.selThing = data;
    this.cm?.show(event)
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
                thingElem.thing = thing;
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[0].label;
                thingElem.icon = this.thingsTypes[0].icon;
                this.lAllThingsList.push(thingElem)

                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.alcoholicid && obj2sub.alcoholicid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.thing = thing;
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[0].label;
                    thingElem.icon = this.thingsTypes[0].icon;
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
                thingElem.thing = thing;
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[1].label;
                thingElem.icon = this.thingsTypes[1].icon;
                this.lAllThingsList.push(thingElem)

                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.foodid && obj2sub.foodid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.thing = thing;
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[1].label;
                    thingElem.icon = this.thingsTypes[1].icon;
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
                thingElem.thing = thing;
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[2].label;
                thingElem.icon = this.thingsTypes[2].icon;
                this.lAllThingsList.push(thingElem)
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.nonalcoholicid && obj2sub.nonalcoholicid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.thing = thing;
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[2].label;
                    thingElem.icon = this.thingsTypes[2].icon;
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
                thingElem.thing = thing;
                thingElem.id = thing.id;
                thingElem.name = thing.name;
                thingElem.type = this.thingsTypes[3].label;
                thingElem.icon = this.thingsTypes[3].icon;
                this.lAllThingsList.push(thingElem)
                this.lObj2Subl.forEach(obj2sub => {
                  if (obj2sub.nonfoodid && obj2sub.nonfoodid == thing.id) {
                    let thingElem = new ThingStruct();
                    thingElem.thing = thing;
                    thingElem.id = thing.id;
                    thingElem.name = thing.name;
                    thingElem.photo = thing.photo;
                    thingElem.type = this.thingsTypes[3].label;
                    thingElem.icon = this.thingsTypes[3].icon;
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

  doSearch() {
    this.filterList();

    if (this.searchText != '')
      this.lThingsList = this.lThingsList.filter((value) => value.name?.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  sortList() {
    this.lAllThingsList.sort((a, b) => {
      if (this.sorting == 1) { // sorting alphabetically
        if (a.name! < b.name!)
          return -1;
        if (a.name! > b.name!)
          return 1;
        if (a.name === b.name)
          if (a.obj2sub)
            return -1
          else
            if (b.obj2sub)
              return 1;
            else
              return 0;
        return 0;
      } else { // sorting by severity
        let sevA = 1000, sevB = 1000, sevSA, sevSB;
        sevSA = this.getSeverety(a);
          switch (sevSA) {
            case 'klBadgeSuccess':
              sevA = 200 + a.obj2sub?.count!
              break;
            case 'klBadgeWarning':
              sevA = 100 + a.obj2sub?.count!
              break;
            case 'klBadgeDanger':
              sevA = a.obj2sub?.count!
              break;
            default:
              break;
          }
        sevSB = this.getSeverety(b);
          switch (sevSB) {
            case 'klBadgeSuccess':
              sevB = 200 + b.obj2sub?.count!
              break;
            case 'klBadgeWarning':
              sevB = 100 + b.obj2sub?.count!
              break;
            case 'klBadgeDanger':
              sevB = b.obj2sub?.count!
              break;
            default:
              break;
          }
          return sevA - sevB;
      }
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

  getSeverety(data: ThingStruct) {
    if (data.obj2sub) {
      if (data.obj2sub.count! <= data.thing?.levels[0]!)
        return 'klBadgeDanger';
      if (data.obj2sub.count! <= data.thing?.levels[1]!)
        return 'klBadgeWarning';
      return 'klBadgeSuccess';
    }
    return null;
  }

  ngOnInit(): void {
    this.reloadNodes();
  }

  onUpdateOnSubject() {
    if (!this.selThing)
      return;

    this.selObj2Sub = this.selThing.obj2sub!;
    this.selSubplace = this.lSubPlaceSelect.find((value) => value.value == this.selThing?.subplace?.id);

    switch (this.selThing.type) {
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

  onUpdateThing() {
    if (this.selThing) {
      const ref = this.dialogService.open(ThingEditComponent, {
        data: this.selThing.thing,
        header: 'Update Thing of type ' + this.selThing.thing!.thing_type,
        breakpoints: { '900px': '50vw', '500px': '100vw' },
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
        resizable: false,
        modal: true,
        closeOnEscape: true,
        draggable: false,
      });

      ref.onClose.subscribe((thing: Thing) => {
        if (thing) {
          this.selThing!.name = thing.name;
          this.selThing!.photo = thing.photo;
          this.selThing!.thing = thing;
        }
      })
    }
  }

  onAddOnSubject() {
    if (!this.selThing)
      return;

    this.selObj2Sub = new Object2Subplace()
    this.selObj2Sub.id = 0;
    switch (this.selThing.type) {
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
    if (this.selObj2Sub.id == 0) {
      this.selObj2Sub.id = undefined;
      this.selObj2Sub.subplaceid = this.selSubplace.value;
      this.backendService.insertOject2Subplace(this.selObj2Sub).subscribe({
        next: (result) => {
          this.showDialog = false;
          const thing: ThingStruct = { ...this.selThing! };
          thing.obj2sub = result.data as Object2Subplace
          if (thing.obj2sub.valid_until && thing.obj2sub.valid_until != '') {
            const date = Date.parse(thing.obj2sub.valid_until);
            thing.obj2sub.valid_until_date = new Date(date);
          }
          thing.subplace = this.lSubplaces.find(s => s.id == thing.obj2sub!.subplaceid);
          thing.place = this.lPlaces.find(p => p.id == thing.subplace?.placeid)
          thing.placetype = this.lPlacetypes.find(pt => pt.id == thing.place?.placetypeid)
          this.lAllThingsList.push(thing)
          this.sortList();
          this.filterList();
        }
      });
    } else {
      this.selObj2Sub.subplaceid = this.selSubplace.value;
      this.backendService.updateObject2Subplace(this.selObj2Sub).subscribe({
        next: (result) => {
          this.showDialog = false;
          this.selThing!.obj2sub = result.data as Object2Subplace;
          this.selThing!.subplace = this.lSubplaces.find(s => s.id == this.selThing!.obj2sub!.subplaceid);
          this.selThing!.place = this.lPlaces.find(p => p.id == this.selThing!.subplace?.placeid)
          this.selThing!.placetype = this.lPlacetypes.find(pt => pt.id == this.selThing!.place?.placetypeid)
          if (this.selThing!.obj2sub.valid_until && this.selThing!.obj2sub.valid_until != '') {
            const date = Date.parse(this.selThing!.obj2sub.valid_until);
            this.selThing!.obj2sub.valid_until_date = new Date(date);
          }
        }
      });

    }

  }

  onRemoveOne(data: ThingStruct, event: Event) {
    this.preventSingleClick = false;
    const delay = 200;
    this.timer = setTimeout(() => {
      if (!this.preventSingleClick) {
        if (data.obj2sub) {
          data.obj2sub.count = Math.max(data.obj2sub.count ? data.obj2sub.count - 1 : 0, 0);
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
            this.backendService.updateObject2Subplace(data.obj2sub).subscribe({
              next: (ret) => {
              }
            })
          }
        } else {
          this.selThing = data;
          this.onAddOnSubject();
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
    if (data.obj2sub?.valid_until_date) {
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
