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
  categoryOptions: string[] = []; //inventory update modal need to correction from DB
  showModal: boolean = false;
  categories: any;
  totalInventoryValue: number = 0;
  lowStockMedicines: any[] = [];
  
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadInventory();
    this.loadLowStockMedicines();
  }

  loadLowStockMedicines() {
  this.inventoryService.getLowStockMedicines().subscribe(data => {
    this.lowStockMedicines = data;
  });
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

  deleteMedicine(name: string, category: string) {
  const trimmedName = name.trim();
  const trimmedCategory = category.trim();

  if (confirm(`Delete ${trimmedName} (${trimmedCategory})?`)) {
    this.inventoryService.deleteMedicineByNameAndCategory(trimmedName, trimmedCategory).subscribe({
      next: () => {
        this.loadInventory();
        alert('Medicine deleted');
      },
      error: err => {
          console.error('Delete failed', err);
          alert('Medicine deleted');
          this.loadInventory();
        }
    });
  }
}


  editMedicine(med: any) {
    this.selectedMedicine = { ...med }; 
    this.showModal = true; 
  }

  closeModal() {
    this.selectedMedicine = null;
    this.showModal = false;
  }

  

  //  NEW UPDATE: Now using itemName + category
  updateMedicine() {
    const { itemName, category } = this.selectedMedicine;
    this.inventoryService
      .updateByNameAndCategory(itemName, category, this.selectedMedicine)
      .subscribe({
        next: () => {
          this.loadInventory();
          this.closeModal();
        },
        error: (err) => console.error('Update failed:', err)
      });
  }
}