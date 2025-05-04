import { Routes } from '@angular/router';
import { AdminpanelControllerComponent } from './view-controller/adminpanel-controller/adminpanel-controller.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path: 'dashboard', component: AdminpanelControllerComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            
        ]
    },
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent}
];
