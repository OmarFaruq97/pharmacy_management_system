import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ReceivedMedicieneComponent } from './received-mediciene/received-mediciene.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { CompanyNameComponent } from './company-name/company-name.component';
import { MedicineNameComponent } from './medicine-name/medicine-name.component';


export const routes: Routes = [

    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'home', component: HomeComponent},
    {path: 'receive-med', component: ReceivedMedicieneComponent},    
    {path: 'inventory', component: InventoryComponent},
    {path: 'invoice', component: InvoiceComponent},
    {path: 'invoice-history', component: InvoiceHistoryComponent},
    {path: 'employee', component: EmployeeManagementComponent},
    { path: 'daily-report', component: DailyReportComponent },
    { path: 'company-medicine-input', component: CompanyNameComponent},
    { path: 'add-medicine', component: MedicineNameComponent}
];