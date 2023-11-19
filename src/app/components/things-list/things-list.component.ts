import { Component, OnInit } from '@angular/core';
import { ThingEditComponent } from '@components/thing-edit/thing-edit.component';
import { ReturnStruct } from '@models/generel';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Thing } from '@models/things';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, map, zip } from 'rxjs';

@Component({
  selector: 'keller-frontend-things-list',
  templateUrl: './things-list.component.html',
  styleUrls: ['./things-list.component.css'],
  providers: [DialogService]
})
export class ThingsListComponent implements OnInit {

  lThings: Thing[] = []
  isLoading = true;

  selThing: Thing | undefined;

  constructor(private messageService: MessageService,
    private backendService: BackendService,
    private authService: AuthService,
    private dialogService: DialogService) { }


  ngOnInit(): void {
    zip(this.backendService.getAllThings(), this.backendService.getUsers())
    .pipe(
      map(([thingsRet, usersRet]) => {
        this.lThings = thingsRet.data as Thing[];
        this.lThings.forEach(thing => {
          if (thing.userid && thing.userid > 0) {
            const iUser = (usersRet.data! as User[]).findIndex(
              (user) => user.id == thing.userid);
            if (iUser >= 0)
              thing.user = (usersRet.data! as User[])[iUser].name;
          }
        })
        this.isLoading = false;
      })
    ).subscribe();

  }

  onRowNew() {
    const ref = this.dialogService.open(ThingEditComponent, {
      data:  undefined,
      header: 'Add new Thing',
      width: '50%',
      height: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      closable: true,
      resizable: true,
      modal: true,
      closeOnEscape: true,
      draggable: true
    })

    ref.onClose.subscribe({
      next: (thingRet) => {
        if (thingRet) {
          thingRet.user = this.authService.userValue.name;
          this.lThings.push(thingRet as Thing)
        }
      }
    })
  }
  onRowDelete(thing: Thing, ind: number) {
    let obs: Observable<ReturnStruct> | undefined;

    switch (thing.thing_type) {
      case 'alcoholic':
        obs = this.backendService.deleteAlcoholic(thing as Alcoholic);
        break;

      case 'food':
        obs = this.backendService.deleteFood(thing as Food);
        break;

      case 'nonalcoholic':
        obs = this.backendService.deleteNonalcoholic(thing as Nonalcoholic);
        break;

      case 'nonfood':
        obs = this.backendService.deleteNonfood(thing as Nonfood);
        break;

      default:
        break;
    }

    obs?.subscribe({
      next: (thing) => {
        delete this.lThings[ind]
      }
    })
  }
  onRowEdit(thing: Thing, ind: number) {
    const ref = this.dialogService.open(ThingEditComponent, {
      data: thing,
      header: 'Update Thing of type ' + thing.thing_type,
      width: '50%',
      height: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      closable: true,
      resizable: true,
      modal: true,
      closeOnEscape: true,
      draggable: true
    })

    ref.onClose.subscribe({
      next: (thingRet) => {
        if (thingRet) {
          thingRet.user = this.authService.userValue.name;
          this.lThings[ind] = thingRet as Thing
        }
      }
    })
  }

}
