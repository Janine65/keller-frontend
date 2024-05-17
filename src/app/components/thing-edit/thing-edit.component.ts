import { Component } from '@angular/core';
import { ReturnStruct } from '@models/generel';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Thing, Grapes, WineType, ListElement } from '@models/things';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';

@Component({
  selector: 'keller-frontend-thing-edit',
  templateUrl: './thing-edit.component.html',
  styleUrls: ['./thing-edit.component.css'],
})
export class ThingEditComponent {

  thing: Thing = new Thing();
  alcoholic: Alcoholic = new Alcoholic();
  food: Food = new Food();
  nonalcoholic: Nonalcoholic = new Nonalcoholic();
  nonfood: Nonfood = new Nonfood();

  isLoading = true;
  grapes = Grapes;
  wineType = WineType

  countries: ListElement[] = [];
  selectedCountry: ListElement | undefined;


  constructor(private backendService: BackendService,
    private messageService: MessageService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public conf: DynamicDialogConfig) {
      this.countries = [
        { name: 'Australia', code: 'au' },
        { name: 'Brazil', code: 'br' },
        { name: 'France', code: 'fr' },
        { name: 'Germany', code: 'de' },
        { name: 'Hungaria', code: 'hu' },
        { name: 'Italy', code: 'it' },
        { name: 'Spain', code: 'es' },
        { name: 'South Africa', code: 'sa' },
        { name: 'Switzerland', code: 'ch' },
        { name: 'United States', code: 'us' }
    ];

    if (this.conf.data) {

      this.thing = this.conf.data;

      if (this.thing.id && this.thing.id > 0) {
        switch (this.thing.thing_type) {
          case 'alcoholic':
            this.backendService.getOneAlcoholic(this.thing.id).subscribe({
              next: (retCode) => {
                this.alcoholic = retCode.data as Alcoholic;
                this.selectedCountry = this.countries.find(cc => cc.code == this.alcoholic.country);
                this.alcoholic.year_date = this.alcoholic.year ? new Date(this.alcoholic.year,1,1) : undefined;
                this.isLoading = false;
              }
            });
            break;

          case 'food':
            this.backendService.getOneFood(this.thing.id).subscribe({
              next: (retCode) => {
                this.food = retCode.data as Food;
                this.isLoading = false;
              }
            });
            break;

          case 'nonalcoholic':
            this.backendService.getOneNonalcoholic(this.thing.id).subscribe({
              next: (retCode) => {
                this.nonalcoholic = retCode.data as Nonalcoholic;
                this.isLoading = false;
              }
            });
            break;

          case 'nonfood':
            this.backendService.getOneNonfood(this.thing.id).subscribe({
              next: (retCode) => {
                this.nonfood = retCode.data as Nonfood;
                this.isLoading = false;
              }
            });
            break;

          default:
            break;
        }

      }
    }
  }

  onSave() {    
    let obs: Observable<ReturnStruct> = new Observable<ReturnStruct>()
    switch (this.thing.thing_type) {
      case 'alcoholic':
        this.alcoholic.thing_type = this.thing.thing_type;
        if (this.alcoholic.name == undefined || this.alcoholic.name.length == 0) {
          this.messageService.add({closable: true, detail: 'Name must not be empty', key: 'error', sticky: true, summary: 'Must-Field empty'})
          return
        }
        if (this.alcoholic.year_date)
          this.alcoholic.year = this.alcoholic.year_date.getFullYear()
        if (this.selectedCountry)
          this.alcoholic.country = this.selectedCountry.code;
        if (this.thing.id == undefined || this.thing.id == 0) {
          this.alcoholic.id = undefined;
          this.alcoholic.userid = this.authService.userValue.id;
          obs = this.backendService.insertAlcoholic(this.alcoholic);
        }
        else {
          this.alcoholic.userid = this.authService.userValue.id;
          obs = this.backendService.updateAlcoholic(this.alcoholic)
        }
        break;
      case 'food':
        this.food.thing_type = this.thing.thing_type;
        if (this.food.name == undefined || this.food.name.length == 0) {
          this.messageService.add({closable: true, detail: 'Name must not be empty', key: 'error', sticky: true, summary: 'Must-Field empty'})
          return
        }
        if (this.thing.id == undefined || this.thing.id == 0) {
          this.food.id = undefined;
          this.food.userid = this.authService.userValue.id;
          obs = this.backendService.insertFood(this.food);
        }
        else {
          this.food.userid = this.authService.userValue.id;
          obs = this.backendService.updateFood(this.food)
        }
        break;
      case 'nonalcoholic':
        this.nonalcoholic.thing_type = this.thing.thing_type;
        if (this.nonalcoholic.name == undefined || this.nonalcoholic.name.length == 0) {
          this.messageService.add({closable: true, detail: 'Name must not be empty', key: 'error', sticky: true, summary: 'Must-Field empty'})
          return
        }
        if (this.thing.id == undefined || this.thing.id == 0) {
          this.nonalcoholic.id = undefined;
          this.nonalcoholic.userid = this.authService.userValue.id;
          obs = this.backendService.insertNonalcoholic(this.nonalcoholic);
        }
        else {
          this.nonalcoholic.userid = this.authService.userValue.id;
          obs = this.backendService.updateNonalcoholic(this.nonalcoholic)
        }
        break;
      case 'nonfood':
        this.nonfood.thing_type = this.thing.thing_type;
        if (this.nonfood.name == undefined || this.nonfood.name.length == 0) {
          this.messageService.add({closable: true, detail: 'Name must not be empty', key: 'error', sticky: true, summary: 'Must-Field empty'})
          return
        }
        if (this.thing.id == undefined || this.thing.id == 0) {
          this.nonfood.id = undefined;
          this.nonfood.userid = this.authService.userValue.id;
          obs = this.backendService.insertNonfood(this.nonfood);
        }
        else {
          this.nonfood.userid = this.authService.userValue.id;
          obs = this.backendService.updateNonfood(this.nonfood)
        }
        break;
      default:
        break;
    }
    obs.subscribe({
      next: (retData) => {
        this.thing = retData.data as Thing;
        this.ref.close(this.thing)
      }
    })

  }

  onCancel() {
    this.ref.close()
  }

  loadPhoto(event: FileUploadEvent) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        // Set image src
        switch (this.thing.thing_type) {
          case 'alcoholic': {
            this.alcoholic.photo = e.target.result;
            break;
          }
          case 'nonalcoholic': {
            this.nonalcoholic.photo = e.target.result;
            break;
          }
          case 'food': {
            this.food.photo = e.target.result;
            break;
          }
          case 'nonfood': {
            this.nonfood.photo = e.target.result;
            break;
          }
        }
    }
    reader.readAsDataURL(event.files[0]);
  }
}
