import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InventoryService } from '../core/inventory.service';

import { CommonModule } from '@angular/common';
import { CompanyNameService } from '../core/company-name.service';
import { MedicineNameService } from '../core/medicine-name.service';

@Component({
  selector: 'app-received-mediciene',
  imports: [FormsModule, CommonModule],
  templateUrl: './received-mediciene.component.html',
  styleUrl: './received-mediciene.component.css'
})
export class ReceivedMedicieneComponent {
  medicine = {
    companyName: '',
    itemName: '',
    generic:'',
    category: '',
    quantity: 0,
    unitPrice: 0,
    purchaseDiscount: 0,
    netPurchasePrice: 0,
    sellPrice: 0    
  };
   
   companyMedicineList: any[] = [];
   medicineNameList: any[] = [];
   

  constructor(
    private inventoryService: InventoryService,
    private companyNameService: CompanyNameService,
    private medicineNameService: MedicineNameService
  ) {}

  ngOnInit(): void {
    this.loadCompanyNames();
    this.loadMedicineNames(); 
  }

  loadCompanyNames() {
    this.companyNameService.getAllCompanies().subscribe({
      next: (data) => {
        this.companyMedicineList = data;
      },
      error: (err) => {
        console.error('Failed to load company names:', err);
      }
    });
  }  

  loadMedicineNames() {
    this.medicineNameService.getAll().subscribe({
      next: (data) => {
        this.medicineNameList = data;
      },
      error: (err) => {
        console.error('Failed to load medicine names:', err);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.medicine.netPurchasePrice = this.medicine.unitPrice - this.medicine.purchaseDiscount;

    this.inventoryService.addMedicine(this.medicine).subscribe({
      next: () => {
        alert('Medicine added!');
        form.resetForm();
      },
      error: (err) => {
        alert('Error adding medicine');
        console.error(err);
      }
    });
  }
}