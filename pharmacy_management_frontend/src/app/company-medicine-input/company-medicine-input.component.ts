import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CompanyMedicineServiceService } from '../core/company-medicine-service.service';

@Component({
  selector: 'app-company-medicine-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './company-medicine-input.component.html',
  styleUrl: './company-medicine-input.component.css'  
})
export class CompanyMedicineInputComponent {
  add={
    companyName: '',
    medicineName: '',
    generic: ''
  };

  constructor(private service :CompanyMedicineServiceService){}
  onSubmit(form: NgForm){
    this.service.addCompanyMedicine(this.add).subscribe({
      next:() => {
        alert ('Successfully save ');
        form.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Error saving');
      }
    });
  }

}
