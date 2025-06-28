import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MedicineName, MedicineNameService } from '../services/medicine-name.service';

@Component({
  selector: 'app-medicine-name',
  imports: [CommonModule, FormsModule],
  templateUrl: './medicine-name.component.html',
  styleUrl: './medicine-name.component.css'
})
export class MedicineNameComponent implements OnInit {
  medicineNames: MedicineName[] = [];
  newMedicineName: string = '';

  constructor(private medicineNameService: MedicineNameService) {}

  ngOnInit(): void {
    this.loadMedicineNames();
  }

  loadMedicineNames() {
  this.medicineNameService.getAll().subscribe({
    next: data => {
      // Sort alphabetically by name
      this.medicineNames = data.sort((a, b) => a.medicineName.localeCompare(b.medicineName));
    },
    error: err => console.error('Error loading medicine names:', err)
  });
}



  addMedicineName() {
    if (!this.newMedicineName.trim()) return;

    this.medicineNameService.add(this.newMedicineName.trim()).subscribe({
      next: () => {
        this.newMedicineName = '';
        this.loadMedicineNames();
      },
      error: err => {
        alert('Error adding medicine name');
        console.error(err);
      }
    });
  }

  deleteMedicineName(id: number) {
    if (!confirm('Are you sure you want to delete this medicine name?')) return;

    this.medicineNameService.delete(id).subscribe({
      next: () => this.loadMedicineNames(),
      error: err => {
        alert('Error deleting medicine name');
        console.error(err);
      }
    });
  }
}