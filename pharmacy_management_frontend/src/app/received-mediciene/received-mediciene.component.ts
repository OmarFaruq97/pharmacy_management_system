import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InventoryService } from '../core/inventory.service';

@Component({
  selector: 'app-received-mediciene',
  imports: [FormsModule],
  templateUrl: './received-mediciene.component.html',
  styleUrl: './received-mediciene.component.css'
})
export class ReceivedMedicieneComponent {
  medicine = {
    companyName: '',
    itemName: '',
    strength: '',
    category: '',
    quantity: 0,
    unitPrice: 0,
    purchaseDiscount: 0,
    netPurchasePrice: 0,
    sellPrice: 0,
    totalInventoryValue: 0
  };

  constructor(private inventoryService: InventoryService) {}

  onSubmit(form: NgForm) {
    this.medicine.netPurchasePrice = this.medicine.unitPrice - this.medicine.purchaseDiscount;
    this.medicine.totalInventoryValue = this.medicine.quantity * this.medicine.netPurchasePrice;

    this.inventoryService.addMedicine(this.medicine).subscribe({
      next: (res) => {
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