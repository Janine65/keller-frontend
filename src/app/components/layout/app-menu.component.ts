import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Bind } from 'primeng/bind';
import { Menubar } from 'primeng/menubar';

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu.component.html',
    styleUrls: ['./app-menu.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [Bind, Menubar, RouterLink]
})
export class AppMenuComponent implements OnInit {
  private backendService = inject(BackendService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private authService = inject(AuthService);

  items: MenuItem[] = [];
  user: User = new User();

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

