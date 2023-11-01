import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css'],
})
export class AppMenuComponent implements OnInit {
  items: MenuItem[] = [];
  user: User = new User();

  constructor(private backendService: BackendService, private messageService: MessageService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => this.setMenu(loggedIn)
    })

    this.authService.getUserValue().subscribe({
      next: (loggedinUser) => this.user = loggedinUser
    })
  }

  setMenu(loggedIn: boolean) {
    this.items = [
      {
        label: 'Base Data',
        icon: 'pi pi-fw pi-building',
        visible: loggedIn,
        items: [
          {
            label: 'Places',
            visible: loggedIn,
            routerLink: 'basedata/places'

          },
          {
            label: 'Subplaces',
            visible: loggedIn,
            routerLink: 'basedata/subplaces'

          },
          {
            label: 'Things',
            visible: loggedIn,
            routerLink: 'basedata/things'
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
            visible: !loggedIn,
            routerLink: 'user/login'
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-lock',
            visible: loggedIn,
            command: async () => {
              await this.loggoutUser();
            }
          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-user-plus',
            visible: !loggedIn,
            routerLink: 'user/register'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            visible: loggedIn,
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


  async loggoutUser() {
    this.backendService.doLogout().subscribe({
      next: async (retVal) => {
        console.log(retVal);
        this.authService.logout();
        await this.router.navigate(['/']);
        this.messageService.add({ detail: 'Du bist ausgelogged!', summary: 'Ausgelogged', severity: 'info', closable: true, sticky: false });
      }
    })
  }
}

