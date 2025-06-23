import { Component } from '@angular/core';
import { ReceivedMedicieneComponent } from "../received-mediciene/received-mediciene.component";
import { CompanyNameComponent } from "../company-name/company-name.component";
import { MedicineNameComponent } from "../medicine-name/medicine-name.component";
import { NewGenericComponent } from "../new-generic/new-generic.component";
import { NewCategoryComponent } from "../new-category/new-category.component";

@Component({
  selector: 'app-access-new',
  imports: [CompanyNameComponent, MedicineNameComponent, NewGenericComponent, NewCategoryComponent],
  templateUrl: './access-new.component.html',
  styleUrl: './access-new.component.css'
})
export class AccessNewComponent {

}
