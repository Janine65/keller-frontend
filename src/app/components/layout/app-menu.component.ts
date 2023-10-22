import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private backendService: BackendService, private messageService: MessageService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Places',
        icon: 'pi pi-fw pi-building',
        visible: this.isLoggedIn(),
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            visible: this.isLoggedIn(),
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            visible: this.isLoggedIn(),
          }
        ]
      },
      {
        label: 'Thing',
        icon: 'pi pi-fw pi-box',
        visible: this.isLoggedIn(),
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            visible: this.isLoggedIn(),
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            visible: this.isLoggedIn(),
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
            visible: !this.isLoggedIn(),
            routerLink: 'user/login'
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-lock',
            visible: this.isLoggedIn(),
            command: async () => {
              await this.loggoutUser();
            }
          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-user-plus',
            visible: !this.isLoggedIn(),
            routerLink: 'user/register'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            visible: this.isLoggedIn(),
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

  isLoggedIn():boolean {
    let fOk = false;
    if (this.authService.isLogged())
      fOk = true;
    return fOk;
  }
  async loggoutUser() {
    this.backendService.doLogout().subscribe({
      next: async (retVal) => {
        console.log(retVal);
        this.authService.logout();
        await this.router.navigate(['/']);
        window.location.reload();
        this.messageService.add({ detail: 'Du bist ausgelogged!', summary: 'Ausgelogged', severity: 'info', closable: true, sticky: false });
      }
    })
  }
}

