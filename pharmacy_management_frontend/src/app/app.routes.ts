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
import { LowStockAlertComponent } from './low-stock-alert/low-stock-alert.component';
import { NewGenericComponent } from './new-generic/new-generic.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { LayoutComponent } from './layout/layout.component';
import { AccessNewComponent } from './access-new/access-new.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'receive-med', component: ReceivedMedicieneComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'invoice-history', component: InvoiceHistoryComponent },
      { path: 'employee', component: EmployeeManagementComponent },
      { path: 'daily-report', component: DailyReportComponent },
      { path: 'company-medicine-input', component: CompanyNameComponent },
      { path: 'add-medicine', component: MedicineNameComponent },
      { path: 'low-stock', component: LowStockAlertComponent },
      { path: 'new-generic', component: NewGenericComponent },
      { path: 'new-category', component: NewCategoryComponent },
      { path: 'access-new', component: AccessNewComponent },
    ],
  },

  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
