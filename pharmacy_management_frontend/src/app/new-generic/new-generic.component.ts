import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Generic, NewGenericService } from '../core/new-generic.service';

@Component({
  selector: 'app-new-generic',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-generic.component.html',
  styleUrl: './new-generic.component.css',
})
export class NewGenericComponent implements OnInit {
  genericList: Generic[] = [];
  newGenericName: string = '';

  constructor(private genericService: NewGenericService) {}

  ngOnInit(): void {
    this.loadGenerics();
  }

  loadGenerics(): void {
    this.genericService.getAllGenerics().subscribe({
      next: (data) => {        
        this.genericList = data.sort((a, b) =>
          a.generic.toLowerCase().localeCompare(b.generic.toLowerCase())
        );
      },
      error: (err) => console.error('Error loading generics', err),
    });
  }

  addGeneric(): void {
    if (!this.newGenericName.trim()) return;

    this.genericService.addGeneric(this.newGenericName.trim()).subscribe({
      next: () => {
        this.newGenericName = '';
        this.loadGenerics();
      },
      error: (err) => {
        alert('Error adding generic');
        console.error('Error adding generic:', err);
      },
    });
  }

  deleteGeneric(id: number): void {
    if (!confirm('Are you sure you want to delete this generic?')) return;

    this.genericService.deleteGeneric(id).subscribe({
      next: () => this.loadGenerics(),
      error: (err) => {
        alert('Error deleting generic');
        console.error('Error deleting generic:', err);
      },
    });
  }
}
