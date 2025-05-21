import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../core/inventory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

export class InventoryComponent implements OnInit{
[x: string]: any;



  medicines: any[] = [];
  selectedMedicine: any = null;
  categoryOptions: string[] = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Suppository', 'Other'];
  showModal: any;
  categories: any;
  totalInventoryValue: number = 0;
  
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getAllMedicine().subscribe({
      next: (data) => {
        this.medicines = data;
        this.calculateTotalInventoryValue();
      },       
            
      error: (err) => console.error(err)
    });
  }

  calculateTotalInventoryValue(): void {
  this.totalInventoryValue = this.medicines.reduce((total, med) => {
    const netPrice = Number(med.netPurchasePrice) || 0;
    const quantity = Number(med.quantity) || 0;
    return total + (netPrice * quantity);
  }, 0);
}

  deleteMedicine(name: string, strength: string) {
    const trimmedName = name.trim();
    const trimmedStrength = strength.trim();
  
    if (confirm(`Delete ${trimmedName} ${trimmedStrength}?`)) {
      this.inventoryService.deleteMedicineByNameAndStrength(trimmedName, trimmedStrength).subscribe({
        next: () => this.loadInventory(),
        error: (err) => console.error('Delete failed:', err)             
      });
      
    }
  }

  editMedicine(med: any) {
    this.selectedMedicine = { ...med }; // clone to avoid direct mutation
  }

  closeModal() {
    this.selectedMedicine = null;
  }

  updateMedicine() {
    const { itemName, strength } = this.selectedMedicine;
    this.inventoryService
      .updateByNameAndStrength(itemName, strength, this.selectedMedicine)
      .subscribe({
        next: () => {
          this.loadInventory();
          this.closeModal();
        },
        error: (err) => console.error('Update failed:', err)
      });
    }
}