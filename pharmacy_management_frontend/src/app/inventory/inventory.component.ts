import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../core/inventory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule,CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit{

  medicines: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getAllMedicine().subscribe({
      next: (data) => (this.medicines = data),
      error: (err) => console.error(err)
    });
  }

  deleteMedicine(name: string , strength: string) {
    if (confirm(`Delete ${name} ${strength}?`)) {
      this.inventoryService.deleteMedicineByNameAndStrength(name, strength).subscribe(() => {
        this.loadInventory();
      });
    }
  }

}
