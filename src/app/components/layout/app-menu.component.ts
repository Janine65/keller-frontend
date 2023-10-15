import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css'],
})
export class AppMenuComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Places',
        icon: 'pi pi-fw pi-building',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
          }
        ]
      },
      {
        label: 'Thing',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search'
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-lock-open',
            routerLink: 'user/login'
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-lock'
          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'user/register'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            routerLink: 'user/list'
          }
        ]
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info',
        routerLink: 'about'
      }
    ];
  }
}
