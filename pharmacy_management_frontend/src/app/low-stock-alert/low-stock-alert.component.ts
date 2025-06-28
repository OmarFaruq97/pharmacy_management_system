import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-low-stock-alert',
  imports: [CommonModule],
  templateUrl: './low-stock-alert.component.html',
  styleUrl: './low-stock-alert.component.css'
})
export class LowStockAlertComponent implements OnInit{

  lowStockItems: any[] = [];
  sufficientStockItems: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadLowStockItems();
    this.loadSufficientStockItems();
  }

  loadLowStockItems() {
    this.inventoryService.getLowStockItems().subscribe({
      next: (data) => this.lowStockItems = data,
      error: (err) => console.error('Error loading low stock:', err)
    });
  }

  loadSufficientStockItems() {
    this.inventoryService.getSufficientStockItems().subscribe({
      next: (data) => this.sufficientStockItems = data,
      error: (err) => console.error('Error loading sufficient stock:', err)
    });
  }

}
