import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../core/category.service';
import { Category, NewCategoryService } from '../core/new-category.service';

@Component({
  selector: 'app-new-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent implements OnInit {
  categoryList: Category[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: NewCategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // loadCategories(): void {
  //   this.categoryService.getAllCategories().subscribe({
  //     next: (data) => (this.categoryList = data),
  //     error: (err) => console.error('Error loading categories:', err),
  //   });
  // }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {        
        this.categoryList = data.sort((a, b) =>
          a.category.toLowerCase().localeCompare(b.category.toLowerCase())
        );
      },
      error: (err) => console.error('Error loading generics', err),
    });
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;

    this.categoryService.addCategory(this.newCategoryName.trim()).subscribe({
      next: () => {
        this.newCategoryName = '';
        this.loadCategories();
      },
      error: (err) => {
        alert('Error adding category');
        console.error('Error adding category:', err);
      },
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => {
        alert('Error deleting category');
        console.error('Error deleting category:', err);
      },
    });
  }
}
