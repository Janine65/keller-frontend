import { Route } from '@angular/router';
import { AppAboutComponent } from '@components/app-about/app-about.component';
import { AppDesktopComponent } from '@components/layout/app-desktop.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { UserLoginComponent } from '@components/user-login/user-login.component';
import { UserRegisterComponent } from '@components/user-register/user-register.component';

export const appRoutes: Route[] = [
    { path: '',
        component: AppDesktopComponent
    },
    {
        path: 'user',
        children: [
            {
                path: 'login',
                component: UserLoginComponent
            },
            {
                path: 'register',
                component: UserRegisterComponent
            },
            {
                path: 'list',
                component: UserListComponent
            }
        ]
    },
    { path: 'about',
        component: AppAboutComponent
    }
];
