import { Route } from '@angular/router';
import { AppAboutComponent } from '@components/app-about/app-about.component';
import { AuthGuard } from './guards/auth.guard';
import { AppDesktopComponent } from '@components/layout/app-desktop.component';
import { PlacesListComponent } from '@components/places-list/places-list.component';
import { SubplaceListComponent } from '@components/subplace-list/subplace-list.component';
import { ThingsListComponent } from '@components/things-list/things-list.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { UserLoginComponent } from '@components/user-login/user-login.component';
import { UserRegisterComponent } from '@components/user-register/user-register.component';

export const appRoutes: Route[] = [
    { path: '',
        component: AppDesktopComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'basedata',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'places',
                component: PlacesListComponent
            },
            {
                path: 'subplaces',
                component: SubplaceListComponent
            },
            {
                path: 'things',
                component: ThingsListComponent
            }
        ]
    },
    {
        path: 'user',
        children: [
            {
                path: 'login',
                component: UserLoginComponent
            },
            {
                path: 'list',
                component: UserListComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: 'about',
        component: AppAboutComponent
    }
];
